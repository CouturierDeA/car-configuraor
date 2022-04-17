import {defineComponent, PropType} from "vue";
import {OptionPayload} from "@/modules/equipment/domain/domain";

export function getOptionEditor() {
    return defineComponent(
        {
            props: {
                mode: {
                    type: String as PropType<'new' | 'edit'>,
                    required: false
                },
                option: {
                    type: Object as PropType<OptionPayload>,
                    required: false
                },
                onCancel: {
                    type: Function as PropType<() => void>,
                    required: false
                },
                onSubmit: {
                    type: Function as PropType<(table: OptionPayload) => void>,
                    required: true
                },
            },

            data() {
                return {
                    name: this.option?.name,
                }
            },
            computed: {
                nameError() {
                    return [
                        {
                            invalid: !this.name || this.name?.length < 3,
                            message: 'Option name min length is 3'
                        }
                    ].find(err => err.invalid)?.message
                },
                formIsInvalid() {
                    return [this.nameError].some(err => !!err)
                },
                isEditMode() {
                    return this.mode === 'edit'
                }
            },
        }
    )
}
