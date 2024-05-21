<template>
  <div class="animation-container">
    <div
      class="animated-element"
      :style="{
        transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      translateX: 0,
      translateY: 0,
      rotation: 0,
      directionX: 1,
      directionY: 1,
      rotationDirection: 1,
      gravity: 4,
      jumpSpeed: 8,
      rotationSpeed: 0.5,
    };
  },
  mounted() {
    this.startAnimation();
  },
  methods: {
    startAnimation() {
      this.animationInterval = setInterval(() => {
        this.updatePosition();
        this.updateRotation();
      }, 16); // Update every 16ms (60fps)
    },
    updatePosition() {
      const containerWidth = this.$el.offsetWidth;
      const containerHeight = this.$el.offsetHeight;
      const elementWidth = this.$el.firstElementChild.offsetWidth;
      const elementHeight = this.$el.firstElementChild.offsetHeight;

      this.translateX += this.directionX * 1;
      this.translateY += this.directionY * 1 + this.gravity;

      // Check if the element is outside the container's bounds
      if (this.translateX + elementWidth >= containerWidth) {
        // Element hit the right side
        this.directionX = -1; // Move left
      } else if (this.translateX <= 0) {
        // Element hit the left side
        this.directionX = 1; // Move right
        this.directionY = -this.jumpSpeed; // Jump up
      }

      if (this.translateY + elementHeight >= containerHeight) {
        this.translateY = containerHeight - elementHeight;
        this.directionY = -this.jumpSpeed; // Jump up
      } else if (this.translateY <= 0) {
        this.translateY = 0;
        this.directionY = 0; // Stop jumping
      }
    },
    updateRotation() {
      this.rotation += this.rotationDirection * this.rotationSpeed;

      // Reverse rotation direction periodically
      if (this.rotation >= 360 || this.rotation <= -360) {
        this.rotationDirection *= -1;
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.animationInterval);
  },
};
</script>

<style scoped>
.animation-container {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
}
.animated-element {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #4fc08d;
  border-radius: 50%;
}
</style>
