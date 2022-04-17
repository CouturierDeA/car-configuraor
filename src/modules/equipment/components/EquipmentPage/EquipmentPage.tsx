import {defineComponent} from 'vue'
import {
    IEquipmentsService,
} from "@/modules/equipment/services/equpment-service";
import {
    OptionsMap,
    EquipmentsTable,
    EquipmentsListView,
    OptionPayload
} from "@/modules/equipment/domain/domain";
import {EquipmentForm} from "@/modules/equipment/components/EquipmentForm/EquipmentForm";
import {EquipmentsList} from "@/modules/equipment/components/EquipmentsList/EquipmentsList";
import Dialog from "@/components/modal/dialog/Dialog";

export function setup(es: IEquipmentsService) {
    return defineComponent(
        {
            data() {
                return {
                    options: [] as OptionsMap[],
                    equipments: [] as EquipmentsTable[],
                    equipmentOnEdit: null as EquipmentsTable | null,
                    equipmentDialogOpened: false,
                }
            },
            methods: {
                async addOption(opt: OptionPayload) {
                    await es.addOption(opt)
                    await this.readOptions()
                },
                editEquipment(eq: EquipmentsTable) {
                    this.equipmentDialogOpened = true
                    this.equipmentOnEdit = eq
                },
                async openNewEquipmentDialog() {
                    this.equipmentDialogOpened = true
                    this.equipmentOnEdit = {
                        id: NaN,
                        name: '',
                        selectedOptions: {}
                    }
                },
                async readEquipments() {
                    this.equipments = await es.getEquipments()
                },
                async readOptions() {
                    this.options = await es.getOptions()
                },
                async onAddOrEditEquipment(eq: EquipmentsTable) {
                    await es.addOrEditEquipment({
                        ...eq,
                    })
                    await this.readEquipments()
                    this.equipmentDialogOpened = false
                }
            },
            async mounted() {
                await this.readEquipments()
                await this.readOptions()
            },
            computed: {
                equipmentsListView(): EquipmentsListView[] {
                    return es.computeEquipmentsListView(this.equipments, this.options)
                }
            },
            render() {
                return <section class="equipment">
                    <h1 class="equipment__title">Equipments page</h1>
                    <EquipmentsList
                        equipmentsListView={this.equipmentsListView}
                        onEditEquipment={this.editEquipment}
                    />
                    <div class="app-form-controls --right">
                        <button class="app-form-control app-btn --success"
                                onClick={() => this.openNewEquipmentDialog()}>
                            + add new equipment
                        </button>
                    </div>
                    <Dialog visible={this.equipmentDialogOpened}
                            onClose={() => this.equipmentDialogOpened = false}
                    >
                        {!!this.equipmentOnEdit && <>
                            <EquipmentForm
                                onSubmit={this.onAddOrEditEquipment}
                                addOption={this.addOption}
                                options={this.options}
                                eq={this.equipmentOnEdit}
                            />
                        </>}
                    </Dialog>
                </section>
            }
        }
    )
}
