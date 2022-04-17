import {defineComponent, PropType} from "vue";
import {EquipmentsTable, EquipmentsListView} from "@/modules/equipment/domain/domain";

export const EquipmentsList = defineComponent(
    {
        props: {
            equipmentsListView: {
                type: Object as () => EquipmentsListView[],
                required: true
            },
            onEditEquipment: {
                type: Function as PropType<(eq: EquipmentsTable) => void>,
                required: false
            }
        },
        data() {
            return {
                opened: NaN
            }
        },
        methods: {
            toggle(equipment: EquipmentsTable) {
                if (this.opened === equipment.id) {
                    this.opened = NaN;
                    return;
                }
                this.opened = equipment.id;
            }
        },
        render() {
            const {opened} = this;
            return <ul class="equipment-list">
                {this.equipmentsListView.map(equipment => <li class="equipment-li">
                    <button class="equipment-li__toggle"
                            onClick={() => this.toggle(equipment)}>{equipment.name}</button>
                    {opened === equipment.id && <>
                        <ul class="equipment-li__body">
                            {equipment.selectedOptionsValues?.map(selection => <li>
                                <strong>{selection.name} </strong>
                                {selection.type === 'checkbox' && <>
                                    {selection.value ? 'Yes' : 'No'}
                                </>}
                                {selection.type !== 'checkbox' && <>
                                    {selection.value || '--'}
                                </>}
                            </li>)}
                            <div class="app-form-controls --right">
                                <button class="app-form-control app-btn --success"
                                        onClick={() => this.onEditEquipment && this.onEditEquipment({
                                            ...equipment,
                                            selectedOptions: {
                                                ...equipment.selectedOptions
                                            }
                                        })}>
                                    Edit
                                </button>
                            </div>
                        </ul>
                    </>}
                </li>)}
            </ul>
        }
    }
)
