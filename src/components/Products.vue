<template>
  <div class="products">
    <Product
      v-for="product in products"
      :checked="value.includes(product.id)"
      @update:checked="check(product.id, $event)"
      v-bind:product="product"
      :key="product.id"
    />
  </div>
</template>

<script>
import Product from "./Product";

export default {
  emits: ["update:value"],
  props: {
    value: {
      type: Array,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const check = (productId, checked) => {
      let updatedValue = [...props.value];
      if (checked) {
        updatedValue.push(productId);
      } else {
        updatedValue.splice(updatedValue.indexOf(productId), 1);
      }
      context.emit("update:value", updatedValue);
    };

    return {
      check,
    };
  },
  components: {
    Product,
  },
};
</script>

<style lang="scss" scoped>
.products {
  display: flex;
  max-width: 1100px;
  margin: auto;
  justify-content: center;
  padding-top: 25px;
  flex-wrap: wrap;
}
</style>
