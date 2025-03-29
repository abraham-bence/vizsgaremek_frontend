
export interface Product {
    id: number;
    name: string;
    manufacturer: string;
    type: string;
    price: number;
    couantity: number;
    imgSrc: string;
    Processor?: Processor;
    Memory?: Memory;
    HardDrive?: HardDrive;
    VideoCard?: VideoCard;
    Motherboard?: Motherboard;
    CPUCooler?: CPUCooler;
    PowerSupply?: PowerSupply;
    Powerhouse?: Powerhouse;
}

export interface Processor {
    id: number;
    coreNumber: number;
    baseFrequency: number;
    turboBoostFrequency: number;
    cache: number;
    architecture: string;
    processorModel: string;
    integratedGraphicModel: string;
    processorTechnology: string;
    productId: number;
}

export interface Memory {
    id: number;
    memoryCapacity: number;
    memoryType: string;
    installedMemory: number;
    frequency: number;
    supportedMemoryCapacity: number;
    productId: number;
}

export interface HardDrive {
    id: number;
    capacity: number;
    storageType: string;
    connectionInterface: string;
    readingSpeed: number;
    writingSpeed: number;
    nandFlashType: string;
    pciGeneration: number;
    productId: number;
}

export interface VideoCard {
    id: number;
    videoChipset: string;
    producer: string;
    cpuSocket: string;
    coolingType: string;
    graphicChipSpeed: number;
    graphicMemorySpeed: number;
    memoryCapacity: number;
    bandwidth: number;
    suggestedPower: number;
    displayPort: number;
    size: string;
    productId: number;
}

export interface Motherboard {
    id: number;
    cpuSocket: string;
    chipset: string;
    memoryType: string;
    processorSeller: string;
    graphicCard: string;
    hdmi: boolean;
    sataConnectors: number;
    pciConnectors: number;
    usbPorts: number;
    memorySockets: number;
    integratedSound: boolean;
    bluetooth: boolean;
    wireless: boolean;
    sizeStandard: string;
    productId: number;
}

export interface CPUCooler {
    id: number;
    fanSpeed: number;
    type: string;
    airflow: number;
    frequency: number;
    productId: number;
}

export interface PowerSupply {
    id: number;
    performance: number;
    fourPinConnector: boolean;
    sixPinVGA: boolean;
    size: string;
    productId: number;
}

export interface Powerhouse {
    id: number;
    motherboardType: string;
    fans: number;
    size: string;
    productId: number;
}

export interface Size {
    id: number;
    width: number;
    length: number;
    height: number;
    productId: number;
}
