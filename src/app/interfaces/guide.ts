export interface Guide {
    id: number;
    name: string;
    city: string;
    country: string;
    photos: { id: number, guideId: number, path: string }[];
    fee: boolean;
    inside: boolean;
    transports: { id: number, icon: string }[];
    howText: string;
    descriptionText: string;
    lat: number;
    lng: number;
}
