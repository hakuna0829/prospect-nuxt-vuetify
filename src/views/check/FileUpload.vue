<template>
  <div class="root border">
    <v-snackbar
      :timeout="2000"
      v-model="valid"
      absolute
      right
      top
      color="error"
    >
      Please upload csv file...
    </v-snackbar>
    <v-snackbar v-model="snackbar" top right color="success">
      Email has been successfully verified.
    </v-snackbar>
    <div class="pa-4">
      Upload file
    </div>
    <div
      class="uploadContainer "
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <div class="p-12  item text-center">
        <label for="assetsFieldHandle" class="block cursor-pointer">
          <div>
            Drag and drop the .csv file or
            <a style="text-decoration:underline">click here</a>
          </div>
        </label>
        <input
          type="file"
          multiple
          name="fields[assetsFieldHandle][]"
          id="assetsFieldHandle"
          class="w-px h-px opacity-0 overflow-hidden absolute"
          style="display:none"
          @change="onChange"
          ref="file"
          accept=".csv"
        />
        <ul class="mt-4" v-if="this.filelist.length" v-cloak>
          <li class="text-sm p-1" v-for="file in filelist" :key="file.name">
            {{ file.name }}
            <button
              class="ml-2 text-decoration-underline"
              type="button"
              @click="remove()"
              title="Remove file"
            >
              Remove
            </button>
          </li>
        </ul>
        <v-btn
          :disabled="this.filelist.length < 1 ? true : false"
          color="primary"
          class="mt-2"
          @click="handleSnackBar(true)"
          >Run email verification</v-btn
        >
      </div>
    </div>
  </div>
</template>
<style>
.root {
  background: #fff;
}
.uploadContainer {
  background: #fff;
  height: 150px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.uploadContainer .item {
  margin: 0 auto;
}

.example-drag label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
.example-drag .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}
.example-drag .drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>

<script>
export default {
  data: () => ({
    filelist: [], // Store our uploaded files
    error: false,
    snackbar: false
  }),
  computed: {
    valid() {
      return this.error;
    }
  },
  methods: {
    onChange() {
      console.log(
        "file type",
        this.$refs.file.files[0].type,
        typeof this.$refs.file.files[0].type,
        this.$refs.file.files
      );

      if (this.$refs.file.files[0].type === "application/vnd.ms-excel") {
        this.error = false;
        this.filelist = [...this.$refs.file.files];
      } else {
        this.error = true;
        this.$toast.info("Info toast");
        this.remove();
      }
      //   this.filelist = [...this.$refs.file.files];
    },
    remove() {
      this.filelist = [];
      this.$refs.file.value = null;
    },
    handleSnackBar(val) {
      console.log("verifcia");
      this.snackbar = val;
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains("bg-green-300")) {
        event.currentTarget.classList.remove("bg-gray-100");
        event.currentTarget.classList.add("bg-green-300");
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;

      this.onChange(); // Trigger the onChange event manually

      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    }
  }
};
</script>
