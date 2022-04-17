import {defineComponent} from "vue";
import {getOptionEditor} from "@/modules/equipment/components/EquipmentOptionEditor/CommonOptionEditor";

export const EquipmentTextOptionEditor = defineComponent(
    {
        extends: getOptionEditor(),
        methods: {
            onSubmitLocal() {
                this.onSubmit({
                    name: this.name,
                    type: 'text',
                    value: this.value,
                })
            }
        },
        data() {
            return {
                value: String(this.option?.value || ''),
                name: this.option?.name || '',
            }
        },
        computed: {
            valueError() {
                return [
                    {invalid: this.value.length < 1, message: 'Option value min length is 1'}
                ].find(err => err.invalid)?.message
            },
            formIsInvalid(){
                return [this.nameError, this.valueError].some(Boolean)
            }
        },
        render() {
            const {onCancel} = this;
            return <form class="app-form">
                <div class="app-form-item">
                    <span class="app-label">Option name</span>
                    <input class="app-input"
                           disabled={this.isEditMode}
                           type="text"
                           v-model={this.name}/>
                    {this.nameError && <div class="app-error">{this.nameError}</div>}
                </div>
                <div class="app-form-item">
                    <span class="app-label">Option value</span>
                    <input class="app-input"
                           type="text"
                           v-model={this.value}/>
                    {this.valueError && <div class="app-error">{this.valueError}</div>}
                </div>
                <div class="app-form-controls --right">
                    {onCancel && <>
                        <button type="button" class="app-form-control app-btn"
                                onClick={onCancel}>
                            cancel
                        </button>
                    </>}
                    <button type="button" disabled={this.formIsInvalid} class="app-form-control app-btn --success"
                            onClick={this.onSubmitLocal}>
                        submit
                    </button>
                </div>
            </form>

        }
    }
)
