export enum CodeDeliveryChannel {
    EMAIL = "E-mail"
}

export namespace CodeDeliveryChannel {
    export function getDisplayName(channel: CodeDeliveryChannel): string {
        return channel;
    }
}