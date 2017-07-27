class MinerPanel extends Polymer.Element {
    static get is() {
        return "miner-panel";
    }

    static get properties() {
        return {
            enabled: {
                type: Boolean,
                value: true,
                notify: true,
            }
        };
    }

    static get observers() {
        return [
            'onChange_(enabled)'
        ];
    }

    onToggleTap_() {
        this.enabled = !this.enabled;
    }

    onChange_() {
        this.dispatchEvent(new CustomEvent('change', {detail: {enabled: this.enabled}}));
    }
}

customElements.define(MinerPanel.is, MinerPanel);
