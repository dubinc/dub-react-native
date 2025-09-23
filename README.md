# @dub/react-native

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
