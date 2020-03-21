<template>
    <div>
        <slot :contentRect="contentRect"></slot>
    </div>
</template>

<script>
export default {
    data: () => ({
        contentRect: {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            size: undefined
        }
    }),
    mounted() {
        if (this.$el) {
            const observer = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    const cr = entry.contentRect;
                    this.contentRect = cr;
                    if (cr.width <= 960) {
                        this.contentRect.size = "medium";
                    }

                    if (cr.width < 660) {
                        this.contentRect.size = "small";
                    } else if (cr.width >= 960) {
                        this.contentRect.size = "large";
                    }

                    if (cr.width > 2000) {
                        this.contentRect.size = "wide";
                    }
                });
            });
            observer.observe(this.$el);
        }
    }
};
</script>

<style>
</style>