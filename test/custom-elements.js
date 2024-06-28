class CustomTextElement extends HTMLElement {
    static formAssociated = true;
    static observedAttributes = ["name", "id"];

    constructor() {
        super();
        this.internals_ = this.attachInternals();
    }
    get form() {
        return this.internals_ != null ? this.internals_.form : null;
    }
    get name() {
        return this.getAttribute("name");
    }
}

window.customElements.define("custom-text", CustomTextElement);
