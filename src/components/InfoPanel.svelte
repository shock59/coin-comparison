<script lang="ts">
  import { type Snippet } from "svelte";

  function containerClicked(event: MouseEvent) {
    if ((event.target as Element).id == "info-panel-container") {
      close();
    }
  }

  let {
    title,
    content,
    close,
  }: { title: Snippet; content: Snippet; close: () => void } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div id="info-panel-container" onclick={containerClicked}>
  <div id="info-panel">
    <div id="info-title">
      {@render title()}
      <button class="material-symbols-outlined" id="close" onclick={close}>
        close</button
      >
    </div>
    <div class="line"></div>
    {@render content()}
  </div>
</div>

<style>
  #info-panel-container {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 1;
    overflow-y: auto;
  }

  #info-panel {
    width: 960px;
    height: fit-content;
    margin: 32px 0;
    padding: 16px;
    background-color: #242424;
    border-radius: 10px;
    font-size: 20px;
  }

  #info-title {
    font-weight: bold;
    font-size: 36px;
    display: flex;
    align-items: center;
  }

  :global(.info-title-img) {
    width: 54px;
    height: 36px;
    margin-right: 8px;
  }

  #close {
    font-size: inherit;
    margin-left: auto;
  }

  :global(.line) {
    margin-top: 8px;
    border-bottom: 2px rgba(255, 255, 255, 0.1) solid;
  }

  :global(p) {
    width: 100%;
    text-align: left;
  }

  :global(.level-2) {
    width: fit-content;
    opacity: 0.65;
    transition: 200ms;
  }

  :global(.level-2:hover) {
    opacity: 1;
  }

  :global(.bold) {
    font-weight: bold;
  }

  :global(.italic) {
    font-style: italic;
  }
</style>
