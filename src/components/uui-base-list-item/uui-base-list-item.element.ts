import { LitElement, css } from 'lit';
import { property } from 'lit/decorators';
import { SelectableMixin } from '../../mixins/SelectableComponent';
import { UUIListItemEvent } from './UUIListItemEvent';

/**
 *  @element uui-card
 *  @fires {UUICardEvent} click-title - fires when the media card title is clicked
 *  @description - Base card component to be extended by specific cards.
 */

export class UUIBaseListItemElement extends SelectableMixin(LitElement) {
  static styles = [
    css`
      :host {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        box-sizing: border-box;
        border-radius: var(--uui-size-border-radius, 3px);
        background-color: var(--uui-interface-surface, white);
        --uui-card-before-opacity: 0;
        transition: --uui-card-before-opacity 120ms;
      }

      :host(:focus) {
        /** TODO: implement focus outline. */
        outline-color: #6ab4f0;
      }

      :host([error]) {
        border: 2px solid var(--uui-look-danger-border, #d42054);
        box-shadow: 0 0 4px 0 var(--uui-look-danger-border, #d42054),
          inset 0 0 2px 0 var(--uui-look-danger-border, #d42054);
      }

      :host([selectable]) {
        cursor: pointer;
      }
      :host([selectable]) #select-border {
        position: absolute;
        z-index: 2;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 120ms;
      }
      :host([selectable]) #select-border::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid var(--uui-interface-select, #1b264f);
        border-radius: calc(var(--uui-size-border-radius, 3px) + 2px);
        box-shadow: 0 0 4px 0 var(--uui-interface-select, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-select, #1b264f);
      }
      :host([selected]) #select-border {
        opacity: 1;
      }
      :host([selectable]:not([selected]):hover) #select-border {
        opacity: 0.33;
      }
      :host([selectable][selected]:hover) #select-border {
        opacity: 0.8;
      }

      :host([selectable]:not([selected])) #open-part:hover + #select-border {
        opacity: 0;
      }
      :host([selectable][selected]) #open-part:hover + #select-border {
        opacity: 1;
      }

      :host([selectable]:not([selected]):hover) #select-border::after {
        animation: not-selected--hover 1.2s infinite;
      }
      @keyframes not-selected--hover {
        0%,
        100% {
          opacity: 0.66;
        }
        50% {
          opacity: 1;
        }
      }

      :host([selectable][selected]:hover) #select-border::after {
        animation: selected--hover 1.4s infinite;
      }
      @keyframes selected--hover {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.66;
        }
      }
      :host([selectable]) #open-part:hover + #select-border::after {
        animation: none;
      }

      button {
        font-size: inherit;
        font-family: inherit;
        border: 0;
        padding: 0;
        background-color: transparent;
      }

      slot[name='actions'] {
        display: flex;
        align-items: center;
        --uui-button-height: calc(var(--uui-size-base-unit) * 4);
        margin-right: var(--uui-size-base-unit);
      }
      #actions-container {
        opacity: 0;
        transition: opacity 120ms;
      }
      :host(:hover) #actions-container {
        opacity: 1;
      }

      /*
      slot[name='tag'] {

      }
      */
    `,
  ];

  constructor() {
    super();
    this.addEventListener('click', this.toggleSelect);
    this.addEventListener('keydown', this.handleSelectKeydown);
  }

  @property({ type: Boolean, reflect: true })
  error = false;

  private toggleSelect() {
    if (this.selectable) this.selected = !this.selected;
    if (this.selected)
      this.dispatchEvent(new UUIListItemEvent(UUIListItemEvent.SELECTED));
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  private handleSelectKeydown(e: KeyboardEvent) {
    // TODO: Is it correct to both be able to select with space and enter?
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    this.toggleSelect();
  }

  protected handleOpenClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new UUIListItemEvent(UUIListItemEvent.OPEN));
  }
  protected handleOpenKeydown(e: KeyboardEvent) {
    // TODO: Is it correct to both be able to open by space and enter? We to investigate, i would think that enter was the only option.
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(new UUIListItemEvent(UUIListItemEvent.OPEN));
  }
}