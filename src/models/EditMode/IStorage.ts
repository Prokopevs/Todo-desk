export interface IModalTask {
    modalTA?: boolean
    setMTA: (...args: boolean[]) => void
}

export interface IModalStatus {
    modalSA?: boolean
    setMSA: (...args: boolean[]) => void
}

export interface IStorage extends IModalTask, IModalStatus {}

