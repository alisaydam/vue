<template>
  <Navbar
    title="Product Add"
    rightItem="Cancel"
    leftItem="Save"
    rightID="11"
    leftID="11"
    @rightEvent="rightEvent"
    @leftEvent="createProduct"
  />
  <div class="container">
    <form id="product_form" action="">
      <div>
        <label for="SKU"> SKU</label>
        <input type="text" id="sku" name="sku" required v-model="state.sku" />
        <span v-if="v$.sku.$error">{{ v$.sku.$errors[0].$message }}</span>
      </div>
      <div>
        <label for="name"> Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          v-model="state.name"
        />
        <span v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</span>
      </div>

      <div>
        <label for="price"> Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          required
          v-model="state.price"
        />
        <span v-if="v$.price.$error">{{ v$.price.$errors[0].$message }}</span>
      </div>
      <div>
        <label for="productType">Choose a Product:</label>
        <select id="productType" name="productType" v-model="state.productType">
          <option id="Dvd" value="Dvd">DVD</option>
          <option id="Book" value="Book">Book</option>
          <option id="Furniture" value="Furniture">Furniture</option>
        </select>
        <span v-if="v$.productType.$error">{{
          v$.productType.$errors[0].$message
        }}</span>
      </div>
      <div v-if="state.productType === 'Dvd'">
        <label for="size"> Size (MB)</label>
        <input type="number" id="size" name="size" v-model="state.size" />
        <!-- <span v-if="v$.size.$error">{{ v$.size.$errors[0].$message }}</span> -->
        <span>{{ state.size ? "" : "Please, provide size" }}</span>
      </div>
      <div v-if="state.productType === 'Book'">
        <label for="weight"> Weight (kg)</label>
        <input type="number" id="weight" name="weight" v-model="state.weight" />
        <!-- <span v-if="v$.weight.$error">{{ v$.weight.$errors[0].$message }}</span> -->
        <span>{{ state.weight ? "" : "Please, provide weight" }}</span>
      </div>
      <div class="fur-con" v-if="state.productType === 'Furniture'">
        <div>
          <label for="number"> Height (CM)</label>
          <input
            type="number"
            id="height"
            name="height"
            v-model="state.height"
          />
          <!-- <span v-if="v$.height.$error">{{ v$.height.$errors[0].$message }}</span> -->
          <span>{{ state.height ? "" : "Please, provide height" }}</span>
        </div>

        <div>
          <label for="width"> Width (CM)</label>
          <input type="number" id="width" name="width" v-model="state.width" />
          <!-- <span v-if="v$.width.$error">{{ v$.width.$errors[0].$message }}</span> -->
          <span>{{ state.width ? "" : "Please, provide width" }}</span>
        </div>

        <div>
          <label for="length"> Length (CM)</label>
          <input
            type="number"
            id="length"
            name="length"
            v-model="state.length"
          />
          <!-- <span v-if="v$.length.$error">{{ v$.length.$errors[0].$message }}</span> -->
          <span>{{ state.length ? "" : "Please, provide length" }}</span>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  numeric,
  requiredIf,
  helpers,
  minLength,
} from "@vuelidate/validators";

export default {
  name: "ProductForm",
  setup() {
    const state = reactive({
      sku: "",
      name: "",
      price: "",
      productType: "Dvd",
      size: "",
      weight: "",
      height: "",
      width: "",
      length: "",
    });
    const rules = computed(() => {
      return {
        sku: {
          required: helpers.withMessage("SKU is reqired", required),
        },
        name: {
          required: helpers.withMessage("Name is reqired", required),
        },
        price: {
          required: helpers.withMessage("Price is reqired", required),
        },
        productType: { required },
        size: {
          required: requiredIf(function () {
            if (state.productType === "Dvd") {
              return true;
            } else {
              return false;
            }
          }),
          numeric,
        },
        weight: {
          required: requiredIf(function () {
            if (state.productType === "Book") {
              return true;
            } else {
              return false;
            }
          }),
          numeric,
        },
        height: {
          required: requiredIf(function () {
            if (state.productType === "Furniture") {
              return true;
            } else {
              return false;
            }
          }),
          numeric,
        },
        width: {
          required: requiredIf(function () {
            if (state.productType === "Furniture") {
              return true;
            } else {
              return false;
            }
          }),
          numeric,
        },
        length: {
          required: requiredIf(function () {
            if (state.productType === "Furniture") {
              return true;
            } else {
              return false;
            }
          }),
          numeric,
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    return {
      state,
      v$,
    };
  },

  methods: {
    rightEvent() {
      this.$router.push("/");
    },
    async createProduct() {
      this.v$.$validate();

      let product = {};

      if (this.state.productType === "Dvd") {
        product = {
          sku: this.state.sku,
          name: this.state.name,
          price: this.state.price,
          productType: this.state.productType,
          size: this.state.size,
        };
      }
      if (this.state.productType === "Book") {
        product = {
          sku: this.state.sku,
          name: this.state.name,
          price: this.state.price,
          productType: this.state.productType,
          weight: this.state.weight,
        };
      }
      if (this.state.productType === "Furniture") {
        product = {
          sku: this.state.sku,
          name: this.state.name,
          price: this.state.price,
          productType: this.state.productType,
          width: this.state.width,
          height: this.state.height,
          length: this.state.length,
        };
      }

      if (!this.v$.$error) {
         const res = await fetch("https://sw-api.000webhostapp.com/products/create", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
        const data = await res.json();
        if (data.success) {
          this.$router.push("/");
        } else {
          this.$toast.error(data.message, {
            position: "top",
          });
        }
      }
    },
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding-top: 50px;

  form {
    width: 40%;
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      position: relative;

      span {
        position: absolute;
        right: 0;
        top: 25px;
        font-size: 10px;
        color: red;
      }
    }

    .fur-con {
      flex-direction: column;
    }
  }
}
</style>
