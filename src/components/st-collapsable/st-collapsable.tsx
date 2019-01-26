import { Component, Element, Prop, Event, EventEmitter, Method } from "@stencil/core";

const COLLAPSABLE_TRIGGER_BUTTON_CLASS = 'St-Collapsable__trigger';
const COLLAPSABLE_TRIGGER_BUTTON_COLLAPSED_CLASS = 'St-Collapsable__trigger--collapsed';
const COLLAPSABLE_WRAPPER_CLASS = 'St-Collapsable__wrapper';
const COLLAPSED_CLASS = 'St-Collapsable--collapsed';

@Component({
  tag: "st-collapsable",
  styleUrl: "st-collapsable.scss"
})
export class STCollapsable {
  @Element() collapsableElement: HTMLElement
  @Event() expandHandler: EventEmitter
  @Event() collapseHandler: EventEmitter
  @Prop() collapsableId: string
  @Prop() collapsed: boolean = true
  
  el: HTMLElement
  collapsableTriggers: NodeListOf<HTMLElement>
  expandEventRef: EventListenerObject
  collapseEventRef: EventListenerObject
  triggerElement: HTMLElement

  componentDidLoad() {
    this.expandEventRef = this.expandEvent.bind(this)
    this.collapseEventRef = this.collapseEvent.bind(this)
    this.collapsableTriggers = document.getElementsByClassName(COLLAPSABLE_TRIGGER_BUTTON_CLASS) as unknown as NodeListOf<HTMLElement>

    Array.from(this.collapsableTriggers).forEach((triggerElement) => {
      if ((triggerElement as HTMLElement).getAttribute("st-collapsable-trigger") === this.el.id) {
        triggerElement.addEventListener('click', () => {
          if (this.el.dataset.disabled !== 'true') {
            this.toggle(triggerElement)
          }
        }, false);
      }
    });
  }

  /**
   * @name expandEvent
   * @description
   * Event fired after the transition of the collapsable is done
   */
  expandEvent() {
    this.el.classList.remove(COLLAPSED_CLASS)
    this.el.removeAttribute('style')
    this.el.removeEventListener('transitionend', this.expandEventRef, false)
    this.expandHandler.emit();
  }

  /**
   * @name collapsEvent
   * @description
   * Event fired after the transition of the collapsable is done
   */
  collapseEvent() {
    this.el.classList.add(COLLAPSED_CLASS)
    this.el.removeEventListener('transitionend', this.collapseEventRef, false)
    this.collapseHandler.emit()
  }

  /**
   * @name toggle
   * @description
   * Decides if the collapsable should be expanded or collapsed. 
   * It's public so that it's possible to trigger collapsable content also from JS: 
   * document.querySelector('st-collapsable').toggle()
   */
  @Method()
  toggle(triggerElement?) {
    this.triggerElement = triggerElement;
    if (this.el.classList.contains(COLLAPSED_CLASS)) {
      if (this.el.dataset.groupClass) {
        let openedCollapsables = 0;
        Array.from(document.getElementsByClassName(this.el.dataset.groupClass) as unknown as NodeListOf<HTMLElement>)
          .forEach((collapsableElement) => {
            if (!collapsableElement.classList.contains(COLLAPSED_CLASS)) {
              openedCollapsables += 1;
              collapsableElement.style['max-height'] = this.getContentHeight();
              const collapseEvent = () => {
                collapsableElement.classList.add(COLLAPSED_CLASS);
                collapsableElement.removeEventListener('transitionend', collapseEvent, false);
              };

              setTimeout(() => {
                collapsableElement.style['max-height'] = '0px';
                collapsableElement.style['overflow-y'] = 'hidden';
                collapsableElement.addEventListener('transitionend', collapseEvent);
                if (this.triggerElement) {
                  this.triggerElement.classList.add(COLLAPSABLE_TRIGGER_BUTTON_COLLAPSED_CLASS);
                }
              }, 100);
            }
          });
        if (openedCollapsables > 0) {
          setTimeout(() => {
            this.expand();
          }, 1000);
        } else {
          this.expand();
        }
      } else {
        this.expand();
      }
    } else {
      this.collapse();
    }
  }

  /**
   * @name expand
   * @description
   * Expands the content.
   */
  expand() {
    this.el.style['max-height'] = this.getContentHeight();
    this.el.addEventListener('transitionend', this.expandEventRef);
    if (this.triggerElement) {
      this.triggerElement.classList.remove(COLLAPSABLE_TRIGGER_BUTTON_COLLAPSED_CLASS);
    }
  }

  /**
   * @name collapse
   * @description
   * Collapses the content.
   */
  collapse() {
    this.el.style['max-height'] = this.getContentHeight();
    setTimeout(() => {
      this.el.style['max-height'] = '0px';
      this.el.style['overflow-y'] = 'hidden';
      this.el.addEventListener('transitionend', this.collapseEventRef);
    }, 100);
    if (this.triggerElement) {
       this.triggerElement.classList.add(COLLAPSABLE_TRIGGER_BUTTON_COLLAPSED_CLASS);
    }
  }

  /**
   * @name getContentHeight
   * @returns {Number} The height including margins in pixels
   * @description
   * Gets the height of the directive's content.
   * Also respects the margins of the first and the last child, because this margin can collapse
   * with the margins of the element itself.
   */
  getContentHeight() {
    const wrapperChild = this.el.getElementsByClassName(COLLAPSABLE_WRAPPER_CLASS)[0];
    return window.getComputedStyle(wrapperChild).height;
  }
  
  render() {
    return (
      <div id={this.collapsableId} 
           class={this.collapsed ? 'St-Collapsable St-Collapsable--collapsed' : 'St-Collapsable'}
           ref={(e:HTMLElement) => this.el = e}>
        <div class="St-Collapsable__wrapper">
          <slot/>
        </div>
      </div>
    );
  }
}
