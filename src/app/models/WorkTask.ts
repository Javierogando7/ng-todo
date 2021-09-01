export interface WorkTask {
    id: number;
    title: string;
    description: string;
    lastUpdate: Date;
    creationDate: Date;
    priority: string;
    isCompleted: boolean;
}
