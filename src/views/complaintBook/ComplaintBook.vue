<template>
  <!-- Fondo gris -->
  <CContainer sm class="mt-2 color_primary">
    <CRow class="mx-2">
      <CCol sm="12">
        <CImage
          fluid
          :src="info"
          class="custom-img-logo mb-4 mt-4"
          alt="Info"
        />
      </CCol>
      <CCol sm="12">
        <h2 class="color_secondary">
          <span>
            <b class="font-size-custom-title">Tu experiencia nos importa</b>
          </span>
        </h2>
      </CCol>
      <CCol sm="12">
        <p class="font-size-custom">
          Queremos conocer tu experiencia. Contanos que paso y vamos a ayudarte.
        </p>
      </CCol>
    </CRow>

    <CForm @submit.prevent="handleSubmit">
      <CRow class="mx-2 mt-5">
        <h4 class="color_secondary">
          <span><b>Tus datos personales</b></span>
        </h4>
      </CRow>

      <CRow class="mx-2">
        <CCol class="mt-1" sm="12">
          <CFormLabel for="custom-input-name" class="col-sm-2 col-form-label">
            Nombre y Apellido
          </CFormLabel>
          <CFormInput
            v-model="form.name"
            class="custom-input"
            id="custom-input-name"
            type="text"
            size="lg"
            placeholder="Nombre y Apellido"
            aria-label="Nombre y Apellido"
          />
          <CFormText
            as="span"
            class="custom-alert"
            :class="{ active: showRequired('name') }"
            id="custom-input-name-alert"
          >
            Ingresa tu Nombre y Apellido
          </CFormText>
        </CCol>

        <CCol class="mt-1" sm="12">
          <CFormLabel for="custom-input-dni" class="col-sm-2 col-form-label">
            DNI
          </CFormLabel>
          <CFormInput
            v-model="form.dni"
            class="custom-input"
            id="custom-input-dni"
            type="text"
            size="lg"
            placeholder="Ingresar tu DNI"
            aria-label="DNI"
          />
          <CFormText
            class="custom-alert"
            :class="{ active: showRequired('dni') }"
            as="span"
            id="custom-input-dni-alert"
          >
            Ingresa tu DNI
          </CFormText>
        </CCol>

        <CCol class="mt-1" sm="12">
          <CFormLabel for="custom-input-mail" class="col-sm-2 col-form-label">
            E-mail
          </CFormLabel>
          <CFormInput
            v-model="form.email"
            class="custom-input"
            id="custom-input-mail"
            type="email"
            size="lg"
            placeholder="Ingresa tu e-mail"
            aria-label="E-mail"
          />
          <CFormText
            class="custom-alert"
            :class="{ active: showRequired('email') }"
            as="span"
            id="custom-input-mail-alert"
          >
            Ingresa tu e-mail
          </CFormText>
        </CCol>

        <CCol class="mt-1" sm="12">
          <CFormLabel for="custom-input-phone" class="col-sm-2 col-form-label">
            Telefono de contacto
          </CFormLabel>
          <CFormInput
            v-model="form.phone"
            class="custom-input"
            id="custom-input-phone"
            type="text"
            size="lg"
            placeholder="Ingresa tu telefono"
            aria-label="Telefono"
          />
          <CFormText
            class="custom-alert"
            :class="{ active: showRequired('phone') }"
            as="span"
            id="custom-input-phone-alert"
          >
            Ingresa tu telefono de contacto
          </CFormText>
        </CCol>
      </CRow>

      <CRow class="mx-2 mt-5">
        <CCol sm="12">
          <h4 class="color_secondary">
            <span><b>Datos del reclamo</b></span>
          </h4>
        </CCol>
        <CCol>
          <p class="font-size-custom">
            Selecciona la <b>sucursal</b> donde tuviste algun
            <b>inconveniente.</b>
          </p>
        </CCol>
      </CRow>

      <CRow class="mx-2">
        <CCol class="mt-2">
          <CFormSelect
            v-model="form.branch_id"
            aria-label="Sucursal"
            class="custom-input"
            :options="branchesOptions"
            :disabled="isBranchLocked"
          >
          </CFormSelect>
          <CFormText
            class="custom-alert"
            :class="{ active: showRequired('branch_id') }"
            as="span"
            id="custom-input-branch-alert"
          >
            Selecciona la sucursal donde tuviste inconvenientes
          </CFormText>
        </CCol>
      </CRow>

      <CRow class="mx-2 mt-5">
        <CCol>
          <p class="font-size-custom">
            Indicanos el <b>motivo de tu reclamo.</b> Selecciona la opcion que
            mejor describa lo ocurrido
          </p>
        </CCol>
      </CRow>

      <CRow class="mx-3">
        <CCol
          v-for="category in categoriesOptions"
          :key="category.value"
          class="mt-3 custom-background-check"
          sm="12"
        >
          <CFormCheck
            type="radio"
            name="complaint-category"
            :id="`complaint-category-${category.value}`"
            :value="category.value"
            :checked="String(form.category_id) === String(category.value)"
            :label="category.label"
            @change="form.category_id = category.value"
          />
        </CCol>
        <div class="form-text"></div>
        <CFormText
          class="custom-alert"
          :class="{ active: showRequired('category_id') }"
          as="span"
          id="custom-input-check-alert"
        >
          Indicar motivo del reclamo
        </CFormText>
      </CRow>

      <CRow class="mx-2 mt-5">
        <CCol sm="12">
          <h2 class="color_secondary">
            <span>
              <b class="font-size-custom-title">Contanos que ocurrio</b>
            </span>
          </h2>
        </CCol>
        <CCol class="mt-2">
          <p class="font-size-custom">
            Danos el mayor detalle posible para poder ayudarte mas rapido
          </p>
        </CCol>
        <CCol sm="12" class="mt-2">
          <CFormTextarea
            v-model="form.description"
            id="custom-input-description"
            class="custom-border custom-text-area"
            rows="8"
            placeholder="Escribir aqui..."
          ></CFormTextarea>
          <CFormText
            class="custom-alert"
            :class="{ active: showRequired('description') }"
            as="span"
            id="custom-input-text-alert"
          >
            Por favor detallanos que fue lo que ocurrio
          </CFormText>
        </CCol>
      </CRow>

      <CRow class="mx-2 mt-5">
        <CCol xs="12">
          <h2 class="color_secondary">
            <span
              ><b class="font-size-custom-title">Adjunta tu archivo</b></span
            >
          </h2>
        </CCol>
        <CCol>
          <p class="font-size-custom">
            Podes sumar una foto, ticket o comprobante si lo tenes
            <i>(No obligatorio)</i>
          </p>
        </CCol>
        <CCol sm="12" class="mt-3">
          <div
            class="custom-file d-flex justify-content-start"
            @click="loadFile"
          >
            <CImage
              fluid
              :src="fileIcon"
              class="custom-img-logo mb-4 mt-4"
              alt="Subir archivo"
            />
            <div v-if="!form.files && !fileError" class="custom-file-content">
              <p class="color_secondary m-0"><b>Subir archivo</b></p>
              <p><small>PDF, JPEG o PNG menos de 5MB</small></p>
              <CFormInput
                type="file"
                @change="handleFile"
                id="custom-load-file"
                class="custom-load-file"
              />
            </div>
            <div v-if="form.files || fileError" class="custom-file-content">
              <p v-if="selectedFileName" class="custom-file-name">
                {{ selectedFileName }}
              </p>
              <p
                class="m-0 custom-file-name-info"
                :class="{ 'custom-file-name-error': fileError }"
              >
                <b>{{ fileError || "Subido correctamente" }}</b>
              </p>
            </div>
            <div
              v-if="form.files || fileError"
              class="custom-div-tash"
              role="button"
              title="Eliminar archivo"
              @click.stop="removeFile"
            >
              <CImage
                fluid
                :src="tash"
                class="custom-img-logo mb-4 mt-4"
                alt="Subir archivo"
              />
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow class="mx-2 mt-5">
        <CCol>
          <p class="font-size-custom">
            Revisa la informacion antes de enviar para que podamos darte una
            mejor respuesta.
          </p>
        </CCol>
      </CRow>

      <CRow class="mx-2 mt-4">
        <CCol sm="12" class="mb-5">
          <div class="custom-btn-save">
            <CButton
              color="secondary"
              class="btn-custom"
              :class="{ 'btn-active': hasAnyFormData }"
              :disabled="isSubmitting"
              type="submit"
            >
              <strong><b class="font-size-custom">Enviar</b></strong>
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CForm>

    <div v-if="showSuccessModal" class="success-modal-backdrop">
      <div class="success-modal">
        <CImage fluid :src="exito" class="success-modal__icon" alt="Exito" />
        <h3 class="success-modal__title color_secondary">
          ¡Enviado exitosamente!
        </h3>
        <p class="success-modal__text">
          Gracias por contactarte con nosotros.<br />
          Tu caso ya fue registrado y nuestro equipo lo va a analizar.<br />
          En las próximas horas te estaremos dando una respuesta.
        </p>
        <CButton
          color="secondary"
          class="success-modal__button"
          @click="showSuccessModal = false"
        >
          Número de caso: #{{ successCaseCode }}
        </CButton>
      </div>
    </div>

    <div v-if="isSubmitting" class="loading-modal-backdrop">
      <div class="loading-modal">
        <CImage
          fluid
          :src="spinner"
          class="loading-modal__spinner"
          alt="Cargando"
        />
      </div>
    </div>
  </CContainer>
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import info from "@/assets/icons/info.svg";
import updateFile from "@/assets/icons/updateFile.svg";
import checkFile from "@/assets/icons/checkFile.svg";
import errorLoad from "@/assets/icons/errorLoad.svg";
import exito from "@/assets/icons/exito.svg";
import spinner from "@/assets/icons/Spinner.svg";
import tash from "@/assets/icons/tash.svg";

const props = defineProps({
  codsuc: {
    type: String,
    default: "",
  },
});

const url = import.meta.env.VITE_BASE_URL;
const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  dni: "",
  phone: "",
  category_id: "",
  branch_id: "",
  description: "",
  files: null,
});

const submitted = ref(false);
const branches = ref([]);
const branchesOptions = ref([]);
const categoriesOptions = ref([]);
const isBranchLocked = ref(false);
const fileError = ref("");
const selectedFileName = ref("");
const showSuccessModal = ref(false);
const successCaseCode = ref("");
const isSubmitting = ref(false);
const maxFileSize = 5 * 1024 * 1024;
const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];

const requiredFields = [
  "name",
  "email",
  "dni",
  "phone",
  "category_id",
  "branch_id",
  "description",
];

const isEmpty = (value) =>
  value === null || value === undefined || value === "";
const showRequired = (field) => submitted.value && isEmpty(form[field]);
const isFormValid = () =>
  requiredFields.every((field) => !isEmpty(form[field]));
const hasAnyFormData = computed(() =>
  [
    form.name,
    form.email,
    form.dni,
    form.phone,
    form.category_id,
    form.branch_id,
    form.description,
    form.files,
  ].some((value) => !isEmpty(value))
);
const fileIcon = computed(() => {
  if (fileError.value) {
    return errorLoad;
  }

  return form.files ? checkFile : updateFile;
});

function loadFile() {
  document.getElementById("custom-load-file")?.click();
}

function handleFile(event) {
  const file = event.target.files[0] || null;
  fileError.value = "";
  form.files = null;
  selectedFileName.value = file?.name || "";

  if (!file) {
    return;
  }

  if (!allowedFileTypes.includes(file.type)) {
    fileError.value = "Archivo no compatible";
    event.target.value = "";
    return;
  }

  if (file.size > maxFileSize) {
    fileError.value = "Archivo excede tamaño permitido";
    event.target.value = "";
    return;
  }

  form.files = file;
}

function removeFile() {
  form.files = null;
  fileError.value = "";
  selectedFileName.value = "";

  const fileInput = document.getElementById("custom-load-file");
  if (fileInput) {
    fileInput.value = "";
  }
}

const resetForm = () => {
  form.name = "";
  form.email = "";
  form.dni = "";
  form.phone = "";
  form.category_id = "";
  form.description = "";
  removeFile();
  submitted.value = false;

  if (!isBranchLocked.value) {
    form.branch_id = "";
  }
};

const handleSubmit = async () => {
  if (isSubmitting.value) {
    return;
  }

  submitted.value = true;

  if (!isFormValid()) {
    await Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor completa todos los campos obligatorios.",
    });
    return;
  }

  const selectedBranch = branches.value.find(
    (branch) => String(branch.coddep) === String(form.branch_id)
  );

  if (!selectedBranch) {
    await Swal.fire({
      icon: "error",
      title: "Sucursal invalida",
      text: "No pudimos validar la sucursal seleccionada.",
    });
    return;
  }
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("dni", form.dni);
  formData.append("phone", form.phone);
  formData.append("category_id", form.category_id);
  formData.append("branch_id", selectedBranch.coddep);
  formData.append("client_description", form.description);

  if (form.files) {
    formData.append("files", form.files);
  }

  isSubmitting.value = true;

  try {
    const response = await fetch(`${url}/api/complaintBook/saveComplaint`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Error al guardar el reclamo.");
    }

    successCaseCode.value = data.data?.code || "";
    isSubmitting.value = false;
    showSuccessModal.value = true;
    resetForm();
  } catch (error) {
    isSubmitting.value = false;
    await Swal.fire({
      icon: "error",
      title: "No se pudo enviar",
      text: error.message || "Error al guardar el reclamo.",
    });
  }
};

const loadFormData = async () => {
  isSubmitting.value = true;

  try {
    const response = await fetch(
      `${url}/api/complaintBook/getFormData?codsuc=${props.codsuc}`
    );
    const data = await response.json();
    if (data.status == 404) {
      router.replace("/404");
      return;
    }

    branches.value = data.branches;
    const matchedBranch = data.branches.find(
      (branch) => String(branch.coddep) === props.codsuc
    );
    if (props.codsuc && !matchedBranch) {
      router.replace("/404");
      return;
    }
    branchesOptions.value = data.branches.map((branch) => ({
      value: branch.coddep,
      label: branch.coddep + "-" + branch.name,
    }));

    branchesOptions.value.unshift({
      value: "",
      label: "Sucursal",
    });

    categoriesOptions.value = data.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

    if (matchedBranch) {
      form.branch_id = matchedBranch.coddep;
      isBranchLocked.value = true;
    }
    isSubmitting.value = false;
  } catch (err) {
    console.log(err);
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error. Por favor, vuelve a intentarlo más tarde.",
      showConfirmButton: false,
    });
  }
};

onBeforeMount(async () => {
  await loadFormData();
});
</script>

<style>
.custom-input {
  padding: 1rem !important;
  border-radius: 1rem;
  font-size: 1rem;
}

.font-size-custom {
  font-size: 1.1rem;
}
.font-size-custom-title {
  font-size: 1.5rem;
}

.form-select {
  border: none;
  background-image: var(--custom-img-select) !important;
}
.form-label {
  font-size: 1.2rem;
  color: var(--color-secondary);
}
.custom-background-check {
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
}
.form-label {
  margin: 0;
  margin-top: 0.2rem;
  margin-left: 0.5rem;
}
.form-check-input {
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 2px;
  border: solid 2px #aaaaaa;
}
.custom-border {
  border-radius: 1rem;
}
.custom-text-area {
  padding: 1rem;
}
.custom-file {
  background-color: #fff;
  border-radius: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  align-items: center;
  min-width: 0;
}
.custom-file > img {
  width: 1.8rem;
  height: 1.5rem;
  margin-inline: 1rem;
  flex: 0 0 auto;
}
.custom-file-content {
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 0.8rem;
}
.custom-load-file {
  display: none;
}
.custom-file-name {
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 600;
}
.custom-file-name-info {
  color: var(--color-secondary);
}
.custom-file-name-error {
  color: var(--color-alert) !important;
}

.btn-custom {
  width: 100%;
  padding: 1.2rem;
  color: #fff;
  background-color: #aaaaaa !important;
  border: none;
  border-radius: 1rem;
}

.form-text {
  color: var(--color-alert) !important;
  padding-left: 1.2rem;
  font-weight: 600;
  font-size: 0.8rem;
}

.custom-alert {
  display: none;
}
.active {
  display: inline;
}
.btn-active {
  background-color: var(--color-secondary) !important;
  color: #fff;
}

.custom-div-tash {
  flex: 0 0 50px;
  width: 50px;
  height: 50px;
  background-color: #e9e9e9;
  border-radius: 50%;
  margin-left: 1rem;
  margin-top: 0 !important;
}
.custom-div-tash > .custom-img-logo {
  margin: auto;
  width: 1.5rem;
  margin-top: 0.8rem !important ;
  margin-left: 0.8rem !important ;
}

.success-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.35);
}

.success-modal {
  width: 100%;
  max-width: 420px;
  padding: 2.5rem 1.8rem;
  border-radius: 1.5rem;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
}

.success-modal__icon {
  width: 5rem;
  margin-bottom: 1.5rem;
}

.success-modal__title {
  margin-bottom: 1rem;
  font-size: 1.45rem;
  font-weight: 700;
  text-align: center;
}

.success-modal__text {
  margin-bottom: 1.6rem;
  text-align: center;
}

.success-modal__button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  border: 1px solid var(--color-secondary) !important;
  background-color: #fff;
  color: var(--color-secondary);
  font-weight: 700;
}

.loading-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1060;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.72);
}

.loading-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 112px;
  border-radius: 1.5rem;
  background-color: #fff;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.14);
}

.loading-modal__spinner {
  width: 4rem;
  height: 4rem;
  animation: spinner-rotate 0.9s linear infinite;
}

@keyframes spinner-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
