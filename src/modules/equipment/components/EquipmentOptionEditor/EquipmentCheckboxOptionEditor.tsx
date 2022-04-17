import {defineComponent} from "vue";
import {getOptionEditor} from "@/modules/equipment/components/EquipmentOptionEditor/CommonOptionEditor";

export const EquipmentCheckboxOptionEditor = defineComponent(
    {
        extends: getOptionEditor(),
        data() {
            return {
                value: true,
                name: this.option?.name || '',
            }
        },
        methods: {
            onSubmitLocal() {
                this.onSubmit({
                    name: this.name,
                    type: 'checkbox',
                    value: this.value,
                })
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
                <div class="app-form-controls --right">
                    {onCancel && <>
                        <button type="button" class="app-form-control app-btn"
                                onClick={onCancel}>
                            cancel
                        </button>
                    </>}
                    <button type="button" disabled={this.formIsInvalid}
                            class="app-form-control app-btn --success"
                            onClick={this.onSubmitLocal}>
                        submit
                    </button>
                </div>
            </form>

        }
    }
)
