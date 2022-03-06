/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { DropCollection } from "./types/drop-collection.interface";
export namespace Components {
    interface NkDropkit {
        /**
          * Drop SDK Key
         */
        "apikey": string;
        /**
          * Flag to enable testnet mode
         */
        "dev": boolean;
        /**
          * Flag to enable multiple wallet support
         */
        "multiple": boolean;
    }
    interface NkErrorMessage {
    }
    interface NkLoading {
    }
    interface NkMintButton {
        "disabled": boolean;
        "loading": boolean;
        "maxPerMint": number;
        "placeholder": string;
        "selectedValue": number;
    }
    interface NkSuccessMessage {
    }
    interface NkSupply {
        /**
          * Drop SDK Key
         */
        "apikey": string;
        /**
          * Flag to enable testnet mode
         */
        "dev": boolean;
    }
    interface NkWalletButton {
        "disabled": boolean;
        "loading": boolean;
    }
}
declare global {
    interface HTMLNkDropkitElement extends Components.NkDropkit, HTMLStencilElement {
    }
    var HTMLNkDropkitElement: {
        prototype: HTMLNkDropkitElement;
        new (): HTMLNkDropkitElement;
    };
    interface HTMLNkErrorMessageElement extends Components.NkErrorMessage, HTMLStencilElement {
    }
    var HTMLNkErrorMessageElement: {
        prototype: HTMLNkErrorMessageElement;
        new (): HTMLNkErrorMessageElement;
    };
    interface HTMLNkLoadingElement extends Components.NkLoading, HTMLStencilElement {
    }
    var HTMLNkLoadingElement: {
        prototype: HTMLNkLoadingElement;
        new (): HTMLNkLoadingElement;
    };
    interface HTMLNkMintButtonElement extends Components.NkMintButton, HTMLStencilElement {
    }
    var HTMLNkMintButtonElement: {
        prototype: HTMLNkMintButtonElement;
        new (): HTMLNkMintButtonElement;
    };
    interface HTMLNkSuccessMessageElement extends Components.NkSuccessMessage, HTMLStencilElement {
    }
    var HTMLNkSuccessMessageElement: {
        prototype: HTMLNkSuccessMessageElement;
        new (): HTMLNkSuccessMessageElement;
    };
    interface HTMLNkSupplyElement extends Components.NkSupply, HTMLStencilElement {
    }
    var HTMLNkSupplyElement: {
        prototype: HTMLNkSupplyElement;
        new (): HTMLNkSupplyElement;
    };
    interface HTMLNkWalletButtonElement extends Components.NkWalletButton, HTMLStencilElement {
    }
    var HTMLNkWalletButtonElement: {
        prototype: HTMLNkWalletButtonElement;
        new (): HTMLNkWalletButtonElement;
    };
    interface HTMLElementTagNameMap {
        "nk-dropkit": HTMLNkDropkitElement;
        "nk-error-message": HTMLNkErrorMessageElement;
        "nk-loading": HTMLNkLoadingElement;
        "nk-mint-button": HTMLNkMintButtonElement;
        "nk-success-message": HTMLNkSuccessMessageElement;
        "nk-supply": HTMLNkSupplyElement;
        "nk-wallet-button": HTMLNkWalletButtonElement;
    }
}
declare namespace LocalJSX {
    interface NkDropkit {
        /**
          * Drop SDK Key
         */
        "apikey": string;
        /**
          * Flag to enable testnet mode
         */
        "dev"?: boolean;
        /**
          * Flag to enable multiple wallet support
         */
        "multiple"?: boolean;
        "onMinted"?: (event: CustomEvent<DropCollection>) => void;
        "onWalletConnected"?: (event: CustomEvent<DropCollection>) => void;
    }
    interface NkErrorMessage {
        "onClosed"?: (event: CustomEvent<boolean>) => void;
    }
    interface NkLoading {
    }
    interface NkMintButton {
        "disabled"?: boolean;
        "loading"?: boolean;
        "maxPerMint": number;
        "onTokensChanged"?: (event: CustomEvent<number>) => void;
        "placeholder"?: string;
        "selectedValue"?: number;
    }
    interface NkSuccessMessage {
        "onClosed"?: (event: CustomEvent<boolean>) => void;
    }
    interface NkSupply {
        /**
          * Drop SDK Key
         */
        "apikey": string;
        /**
          * Flag to enable testnet mode
         */
        "dev"?: boolean;
    }
    interface NkWalletButton {
        "disabled"?: boolean;
        "loading"?: boolean;
    }
    interface IntrinsicElements {
        "nk-dropkit": NkDropkit;
        "nk-error-message": NkErrorMessage;
        "nk-loading": NkLoading;
        "nk-mint-button": NkMintButton;
        "nk-success-message": NkSuccessMessage;
        "nk-supply": NkSupply;
        "nk-wallet-button": NkWalletButton;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "nk-dropkit": LocalJSX.NkDropkit & JSXBase.HTMLAttributes<HTMLNkDropkitElement>;
            "nk-error-message": LocalJSX.NkErrorMessage & JSXBase.HTMLAttributes<HTMLNkErrorMessageElement>;
            "nk-loading": LocalJSX.NkLoading & JSXBase.HTMLAttributes<HTMLNkLoadingElement>;
            "nk-mint-button": LocalJSX.NkMintButton & JSXBase.HTMLAttributes<HTMLNkMintButtonElement>;
            "nk-success-message": LocalJSX.NkSuccessMessage & JSXBase.HTMLAttributes<HTMLNkSuccessMessageElement>;
            "nk-supply": LocalJSX.NkSupply & JSXBase.HTMLAttributes<HTMLNkSupplyElement>;
            "nk-wallet-button": LocalJSX.NkWalletButton & JSXBase.HTMLAttributes<HTMLNkWalletButtonElement>;
        }
    }
}
