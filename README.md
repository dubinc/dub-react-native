<div align="center">
  <img src="https://github.com/user-attachments/assets/6b9d2dec-3139-453c-8a2f-cd0bce9a5bf8" alt="Dub.co React Native SDK to track deep links and attribution.">
  <h3>Dub React Native SDK (BETA)</h3>
</div>

<p align="center">
    Track deep link conversion events in your React Native app
    <br />
    <a href="https://dub.co/docs/concepts/deep-links/attribution"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#development"><strong>Development</strong></a>
    <a href="#contributing"><strong>Contributing</strong></a>
    <a href="#license"><strong>License</strong></a>
</p>

<br/>

<!-- Start Summary [summary] -->

[Dub](http://dub.co/) is the modern link attribution platform for short links, conversion tracking, and affiliate programs.

The Dub React Native SDK is a client side library built in Typescript for React Native.

It enables open tracking for regular/[deferred deep links](https://dub.co/docs/concepts/deep-links/deferred-deep-linking) as well as [tracking lead and sale conversion events](https://dub.co/docs/concepts/deep-links/attribution).

Learn more about the Dub React Native SDK in the [official documentation](https://dub.co/docs/sdks/client-side-mobile/installation-guides/react-native).

<br/>

<!-- Start Summary [summary] -->

Dub is the modern link attribution platform for short links, conversion tracking, and affiliate programs.
The Dub React Native SDK is a client side library built in React Native using Typescript.
It enables open tracking for deep links and deferred deep links as well as conversion tracking for sale and lead events.
Learn more about the Dub React Native SDK in the [official documentation](https://dub.co/docs/sdks/client-side-mobile/installation-guides/react-native).

Handle deep links and track conversions from your React Native app.

## Installation

```sh
npm install @dub/react-native
```

## Usage

### Initialize the Dub SDK

Option 1: Use the `DubProvider` to wrap your app

```typescript
import { DubProvider } from '@dub/react-native';

export default function App() {
return (
    <DubProvider publishableKey="<DUB_PUBLISHABLE_KEY>" dubDomain="<DUB_DOMAIN>">
      // Your app content...
    </DubProvider>
  )
}
```

Option 2: Manually initialize the Dub SDK

```typescript
import dub from '@dub/react-native';

export default function App() {
  useEffect(() => {
    dub.init({
      publishableKey: '<DUB_PUBLISHABLE_KEY>',
      domain: '<DUB_DOMAIN>',
    });
  }, []);

  // Return your app...
}
```

## Development

Run `pnpm install` from the project root to install package dependencies. Then, start the dev server by running `pnpm dev` from the project root. The React Native dev server allows for hot reload.

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT
