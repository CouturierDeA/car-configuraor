import {defineComponent, PropType} from 'vue'
import '@/components/modal/dialog/Dialog.scss'


export default defineComponent({
    name: 'Dialog',
    props: {
        onClose: {
            type: Function as PropType<() => void>,
        },
        visible: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    setup(props) {
        const {onClose} = props;
        const doClose = () => {
            if (onClose) {
                onClose();
            }
        }

        const onWrapperClick = (event: Event) => {
            const className = (event.target as HTMLElement)?.className
            if (className && className.includes('modal-wrapper')) {
                doClose()
            }
        }

        return {
            doClose,
            onWrapperClick
        }
    },
    render() {
        const {doClose, visible, $slots, onWrapperClick} = this;

        if (!visible) {
            return
        }
        return <div>
            <div class="modal-mask">
                <div class="modal-wrapper" onClick={(e) => onWrapperClick(e)}>
                    <div class="modal-container">
                        <button onClick={() => this.doClose()} class="modal-close">X</button>
                        {!!$slots.default && $slots.default(this.doClose)}
                    </div>
                </div>
            </div>
        </div>
    },
})
