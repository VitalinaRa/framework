import Modal from 'bootstrap/js/dist/modal'

export class CustomModal {
  private modalElement: HTMLElement
  private modalMessageElement!: HTMLElement
  constructor(modalElement: HTMLElement, modalMessageElement: HTMLElement | null) {
    this.modalElement = modalElement
    if (modalMessageElement !== null) {
      this.modalMessageElement = modalMessageElement
    }
  }

  show(message: string): void {
    if (this.modalMessageElement) {
      this.modalMessageElement.innerText = message
    }
    const modal = new Modal(this.modalElement)
    modal.show()
  }
}
