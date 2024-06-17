export interface Guide {
    id: number;
    name: string;
    city: string;
    country: string;
    photo: string[];
    fee: boolean;
    inside: boolean;
    transports: string[];
    howText: string;
    descriptionText: string;
    lat: number;
    lng: number;
}
