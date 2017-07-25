class MinerPanel extends Polymer.Element {
  static get is() { return "miner-panel"; }
  static get properties() {
    return {
      enabled: {
        type: Boolean,
        value: true,
      }
    }
  }

  onToggleTap_() {
    this.enabled = !this.enabled;
  }
}
customElements.define(MinerPanel.is, MinerPanel);
