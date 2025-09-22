import Clipboard from '@react-native-clipboard/clipboard';
import type {
  TrackLeadRequestBody,
  TrackLeadResponse,
} from './api/models/track-lead';
import type {
  TrackOpenRequestBody,
  TrackOpenResponse,
} from './api/models/track-open';
import type {
  TrackSaleRequestBody,
  TrackSaleResponse,
} from './api/models/track-sale';
import type { DubOptions } from './types';
import Storage from './storage';
import {
  PlayInstallReferrer,
  type PlayInstallReferrerInfo,
} from 'react-native-play-install-referrer';
import { Platform } from 'react-native';

export class Dub {
  private readonly _publishableKey: string;
  private readonly _domain: string;
  private readonly _baseUrl?: string;
  private _storage: Storage;

  public constructor(options: DubOptions) {
    this._publishableKey = options.publishableKey;
    this._domain = options.domain;
    this._baseUrl = options.baseUrl;
    this._storage = new Storage();
  }

  public get clickId(): Promise<string | null> {
    return this._storage.getClickId();
  }

  public async trackOpen(deepLink?: string): Promise<TrackOpenResponse> {
    const body: TrackOpenRequestBody = {
      dubDomain: this._domain,
    };

    // Attempt to use referrer on Android
    if (Platform.OS === 'android') {
      try {
        const installReferrer = await this.getInstallReferrer();

        const referrerDeepLink = installReferrer
          ? this.extractDeepLinkFromReferrer(installReferrer.installReferrer)
          : null;

        if (referrerDeepLink) {
          body.deepLink = referrerDeepLink;
        }
      } catch (error) {
        // Error getting install referrer, continue with deterministic and probabilistic tracking
      }
    }

    if (deepLink) {
      body.deepLink = deepLink;
    } else {
      try {
        const hasString = await Clipboard.hasString();

        if (hasString) {
          const clipboardText = await Clipboard.getString();

          const resolvedUrl = this.resolveUrl(clipboardText);

          if (resolvedUrl) {
            body.deepLink = resolvedUrl;
          }
        }
      } catch {
        // Clipboard access failed, continue with IP-based tracking
      }
    }

    const response = await this.post<TrackOpenResponse>('/track/open', body);

    // Persist the click ID
    await this._storage.setClickId(response.clickId);

    return response;
  }

  public async trackLead(
    body: Omit<TrackLeadRequestBody, 'clickId'>
  ): Promise<TrackLeadResponse> {
    const clickId = await this._storage.getClickId();

    if (!clickId) {
      throw new Error('Missing click ID. Call trackOpen first.');
    }

    const response = await this.post<TrackLeadResponse>('/track/lead', {
      ...body,
      clickId: clickId,
    });

    await this._storage.clearClickId();

    return response;
  }

  public async trackSale(
    body: Omit<TrackSaleRequestBody, 'clickId'>
  ): Promise<TrackSaleResponse> {
    const clickId = await this._storage.getClickId();

    return this.post<TrackSaleResponse>('/track/sale', {
      ...body,
      clickId: clickId ?? undefined,
    });
  }

  // Helpers
  private resolveUrl(clipboardText: string): string | undefined {
    if (!clipboardText) return undefined;

    // If the pasted content is a valid url with the dub domain, use it
    if (clipboardText.includes(this._domain)) {
      try {
        // eslint-disable-next-line no-new
        new URL(clipboardText);
        return clipboardText;
      } catch {
        // Invalid URL, continue to fallback
      }
    }

    // Fallback and try to construct a url from the dub domain and the
    // text (in the case it is a short link code that was copied)
    try {
      const url = `${this._domain}/${clipboardText}`;
      // eslint-disable-next-line no-new
      new URL(url);
      return url;
    } catch {
      return undefined;
    }
  }

  private getInstallReferrer(): Promise<PlayInstallReferrerInfo | null> {
    if (Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        PlayInstallReferrer.getInstallReferrerInfo((referrerInfo, error) => {
          if (error) {
            reject(error);
          }

          resolve(referrerInfo ?? null);
        });
      });
    }

    return Promise.resolve(null);
  }

  private extractDeepLinkFromReferrer(referrerUrl: string): string | null {
    try {
      // Parse the referrer URL to extract the deep link
      // e.g. for referrer=deepLink%3Dhttps%253A%252F%252Fdub.sh%252Fgps
      // the deep link is https://dub.sh/gps
      const referrerUrlObj = new URL(referrerUrl);
      const deepLinkParam = referrerUrlObj.searchParams.get('deepLink');

      if (!deepLinkParam) {
        return null;
      }

      return decodeURIComponent(deepLinkParam);
    } catch (error) {
      return null;
    }
  }

  private async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>('POST', endpoint, body);
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: any
  ): Promise<T> {
    const baseUrl = this._baseUrl || 'https://api.dub.co';
    const url = `${baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._publishableKey}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        try {
          const errorJson = await response.json();
          throw errorJson;
        } catch (error) {
          // Error parsing error response
        }

        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
