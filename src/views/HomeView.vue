<template>
  <Navbar
    title="Product List"
    leftItem="ADD"
    rightID="delete-product-btn"
    leftID="add-product-btn"
    rightItem="MASS DELETE"
    @rightEvent="massDelete"
    @leftEvent="addProduct"
  />
  <Products v-model:value="checkedProducts" :products="products" />
  <!-- <div class="mt-4 text-gray-800 font-bold">{{ checkedProducts }}</div> -->
</template>

<script>
import Products from "../components/Products";
import Navbar from "../components/Navbar";
import { ref, onMounted } from "vue";

export default {
  name: "HomeView",
  setup() {
    let checkedProducts = ref([]);
    let products = ref([]);

    const getProducts = async () => {
      const res = await fetch(
        "https://sw-api.000webhostapp.com/products"
      );
      const data = await res.json(); 
      products.value = data; 
    };
    const massDelete = async () => {
    try {
        const res = await fetch("https://sw-api.000webhostapp.com/products/delete", {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin":"*",
          "Content-type": "application/json;",
        },
        body: JSON.stringify({
          ids: Object.values(checkedProducts.value),
        }),
      });
      const data = await res.json();
      getProducts();
    } catch (error) {
      console.log(error)
    }
    };

    onMounted(() => {
      getProducts();
    });

    return {
      massDelete,
      checkedProducts,
      getProducts,
      products,
    };
  },
  components: {
    Products,
    Navbar,
  },
  methods: {
    addProduct() {
      this.$router.push("/add-product");
    },
  },
};
</script>

<style></style>
