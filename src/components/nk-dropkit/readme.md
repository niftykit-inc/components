# nk-dropkit



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute  | Description                            | Type      | Default     |
| --------------------- | ---------- | -------------------------------------- | --------- | ----------- |
| `apikey` _(required)_ | `apikey`   | Drop SDK Key                           | `string`  | `undefined` |
| `dev`                 | `dev`      | Flag to enable testnet mode            | `boolean` | `false`     |
| `multiple`            | `multiple` | Flag to enable multiple wallet support | `boolean` | `true`      |


## Events

| Event             | Description | Type                          |
| ----------------- | ----------- | ----------------------------- |
| `walletConnected` |             | `CustomEvent<DropCollection>` |


## Dependencies

### Depends on

- [nk-wallet-button](../nk-wallet-button)
- [nk-mint-button](../nk-mint-button)

### Graph
```mermaid
graph TD;
  nk-dropkit --> nk-wallet-button
  nk-dropkit --> nk-mint-button
  nk-wallet-button --> nk-loading
  style nk-dropkit fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
