<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'

const emit = defineEmits<{
  copyHtml: []
}>()
</script>

<template>
  <DocsSection id="inputy" title="Inputy">
    <DocsSubsection id="input-default" title="Default">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <input class='c-input' type='email' placeholder='andy@wsip.com' />
      <button class='c-input-trailing-button' type='button' aria-label='Pomoc'>
        <i class='ph ph-question c-input-icon'></i>
      </button>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <input class='c-input' type='email' value='andy@wsip.com' />
      <button class='c-input-trailing-button' type='button' aria-label='Pomoc'>
        <i class='ph ph-question c-input-icon'></i>
      </button>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
</div>`"
      >
        <div class="input-stack">
          <div class="c-input-field">
            <label class="c-input-label">Email</label>
            <div class="c-input-group">
              <input class="c-input" type="email" placeholder="andy@wsip.com" />
              <button class="c-input-trailing-button" type="button" aria-label="Pomoc">
                <i class="ph ph-question c-input-icon"></i>
              </button>
            </div>
            <span class="c-input-hint">This is a hint text to help user.</span>
          </div>
          <div class="c-input-field">
            <label class="c-input-label">Email</label>
            <div class="c-input-group">
              <input class="c-input" type="email" value="andy@wsip.com" />
              <button class="c-input-trailing-button" type="button" aria-label="Pomoc">
                <i class="ph ph-question c-input-icon"></i>
              </button>
            </div>
            <span class="c-input-hint">This is a hint text to help user.</span>
          </div>
        </div>
      </DocsExample>

      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <input class='c-input' type='email' placeholder='andy@wsip.com' disabled />
      <button class='c-input-trailing-button' type='button' aria-label='Pomoc' disabled>
        <i class='ph ph-question c-input-icon'></i>
      </button>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <input class='c-input' type='email' placeholder='andy@wsip.com' aria-invalid='true' />
      <span class='c-input-trailing-icon'>
        <i class='ph ph-warning-circle c-input-icon'></i>
      </span>
    </div>
    <span class='c-input-hint c-input-hint--error'>This is an error message.</span>
  </div>
</div>`"
      >
        <div class="input-stack">
          <div class="c-input-field">
            <label class="c-input-label">Email</label>
            <div class="c-input-group">
              <input class="c-input" type="email" placeholder="andy@wsip.com" disabled />
              <button class="c-input-trailing-button" type="button" aria-label="Pomoc" disabled>
                <i class="ph ph-question c-input-icon"></i>
              </button>
            </div>
            <span class="c-input-hint">This is a hint text to help user.</span>
          </div>
          <div class="c-input-field">
            <label class="c-input-label">Email</label>
            <div class="c-input-group">
              <input class="c-input" type="email" placeholder="andy@wsip.com" aria-invalid="true" />
              <span class="c-input-trailing-icon">
                <i class="ph ph-warning-circle c-input-icon"></i>
              </span>
            </div>
            <span class="c-input-hint c-input-hint--error">This is an error message.</span>
          </div>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="input-leading" title="Z ikona po lewej">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <span class='c-input-leading'><i class='ph ph-envelope c-input-icon'></i></span>
      <input class='c-input' type='email' placeholder='andy@wsip.com' />
      <button class='c-input-trailing-button' type='button' aria-label='Pomoc'>
        <i class='ph ph-question c-input-icon'></i>
      </button>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <span class='c-input-leading'><i class='ph ph-envelope c-input-icon'></i></span>
      <input class='c-input' type='email' placeholder='andy@wsip.com' disabled />
      <button class='c-input-trailing-button' type='button' aria-label='Pomoc' disabled>
        <i class='ph ph-question c-input-icon'></i>
      </button>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
  <div class='c-input-field'>
    <label class='c-input-label'>Email</label>
    <div class='c-input-group'>
      <span class='c-input-leading'><i class='ph ph-envelope c-input-icon'></i></span>
      <input class='c-input' type='email' placeholder='andy@wsip.com' aria-invalid='true' />
      <span class='c-input-trailing-icon'>
        <i class='ph ph-warning-circle c-input-icon'></i>
      </span>
    </div>
    <span class='c-input-hint c-input-hint--error'>This is an error message.</span>
  </div>
</div>`"
      >
        <div class="input-stack">
          <div class="c-input-field">
            <label class="c-input-label">Email</label>
            <div class="c-input-group">
              <span class="c-input-leading"><i class="ph ph-envelope c-input-icon"></i></span>
              <input class="c-input" type="email" placeholder="andy@wsip.com" />
              <button class="c-input-trailing-button" type="button" aria-label="Pomoc">
                <i class="ph ph-question c-input-icon"></i>
              </button>
            </div>
            <span class="c-input-hint">This is a hint text to help user.</span>
          </div>
          <div class="c-input-field">
            <label class="c-input-label">Email</label>
            <div class="c-input-group">
              <span class="c-input-leading"><i class="ph ph-envelope c-input-icon"></i></span>
              <input class="c-input" type="email" placeholder="andy@wsip.com" disabled />
              <button class="c-input-trailing-button" type="button" aria-label="Pomoc" disabled>
                <i class="ph ph-question c-input-icon"></i>
              </button>
            </div>
            <span class="c-input-hint">This is a hint text to help user.</span>
          </div>
          <div class="c-input-field">
            <label class="c-input-label">Email</label>
            <div class="c-input-group">
              <span class="c-input-leading"><i class="ph ph-envelope c-input-icon"></i></span>
              <input class="c-input" type="email" placeholder="andy@wsip.com" aria-invalid="true" />
              <span class="c-input-trailing-icon">
                <i class="ph ph-warning-circle c-input-icon"></i>
              </span>
            </div>
            <span class="c-input-hint c-input-hint--error">This is an error message.</span>
          </div>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="input-select" title="Select">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label' id='select-demo-label'>Przedzial</label>
    <div class='c-select' data-select>
      <button
        class='c-select-trigger'
        type='button'
        data-select-trigger
        aria-labelledby='select-demo-label'
        aria-controls='select-demo-list'
        aria-expanded='false'
        aria-haspopup='listbox'
      >
        <span class='c-select-value' data-select-value data-placeholder='true'>Wybierz</span>
        <span class='c-select-icon'><i class='ph ph-caret-down'></i></span>
      </button>
      <div class='c-select-dropdown' data-select-dropdown aria-hidden='true'>
        <div class='c-select-dropdown-list' role='listbox' id='select-demo-list'>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='0'>0</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='1'>0, 1</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='2'>0, 1, 2</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='3'>0, 1, 2, 3</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='4'>0, 1, 2, 3, 4</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='5'>0, 1, 2, 3, 4, 5</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='6'>0, 1, 2, 3, 4, 5, 6</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='7'>0, 1, 2, 3, 4, 5, 6, 7</button>
        </div>
      </div>
    </div>
    <span class='c-input-hint'>Single select.</span>
  </div>
</div>`"
      >
        <div class="input-stack">
          <div class="c-input-field">
            <label class="c-input-label" id="select-demo-label">Przedzial</label>
            <div class="c-select" data-select>
              <button
                class="c-select-trigger"
                type="button"
                data-select-trigger
                aria-labelledby="select-demo-label"
                aria-controls="select-demo-list"
                aria-expanded="false"
                aria-haspopup="listbox"
              >
                <span class="c-select-value" data-select-value data-placeholder="true">Wybierz</span>
                <span class="c-select-icon"><i class="ph ph-caret-down"></i></span>
              </button>
              <div class="c-select-dropdown" data-select-dropdown aria-hidden="true">
                <div class="c-select-dropdown-list" role="listbox" id="select-demo-list">
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="0">0</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="1">0, 1</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="2">0, 1, 2</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="3">0, 1, 2, 3</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="4">0, 1, 2, 3, 4</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="5">0, 1, 2, 3, 4, 5</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="6">0, 1, 2, 3, 4, 5, 6</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="7">0, 1, 2, 3, 4, 5, 6, 7</button>
                </div>
              </div>
            </div>
            <span class="c-input-hint">Single select.</span>
          </div>
        </div>
      </DocsExample>

      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label' id='select-disabled-label'>Przedzial</label>
    <div class='c-select' data-select>
      <button
        class='c-select-trigger'
        type='button'
        data-select-trigger
        aria-labelledby='select-disabled-label'
        aria-controls='select-disabled-list'
        aria-expanded='false'
        aria-haspopup='listbox'
        disabled
      >
        <span class='c-select-value' data-select-value data-placeholder='true'>Wybierz</span>
        <span class='c-select-icon'><i class='ph ph-caret-down'></i></span>
      </button>
      <div class='c-select-dropdown' data-select-dropdown aria-hidden='true'>
        <div class='c-select-dropdown-list' role='listbox' id='select-disabled-list'>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='0'>0</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='1'>0, 1</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='2'>0, 1, 2</button>
        </div>
      </div>
    </div>
    <span class='c-input-hint'>Disabled.</span>
  </div>
  <div class='c-input-field'>
    <label class='c-input-label' id='select-error-label'>Przedzial</label>
    <div class='c-select' data-select>
      <button
        class='c-select-trigger'
        type='button'
        data-select-trigger
        aria-labelledby='select-error-label'
        aria-controls='select-error-list'
        aria-expanded='false'
        aria-haspopup='listbox'
        aria-invalid='true'
      >
        <span class='c-select-value' data-select-value data-placeholder='true'>Wybierz</span>
        <span class='c-select-icon'><i class='ph ph-caret-down'></i></span>
      </button>
      <div class='c-select-dropdown' data-select-dropdown aria-hidden='true'>
        <div class='c-select-dropdown-list' role='listbox' id='select-error-list'>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='0'>0</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='1'>0, 1</button>
          <button class='c-select-option' type='button' role='option' data-select-option data-value='2'>0, 1, 2</button>
        </div>
      </div>
    </div>
    <span class='c-input-hint c-input-hint--error'>This is an error message.</span>
  </div>
</div>`"
      >
        <div class="input-stack">
          <div class="c-input-field">
            <label class="c-input-label" id="select-disabled-label">Przedzial</label>
            <div class="c-select" data-select>
              <button
                class="c-select-trigger"
                type="button"
                data-select-trigger
                aria-labelledby="select-disabled-label"
                aria-controls="select-disabled-list"
                aria-expanded="false"
                aria-haspopup="listbox"
                disabled
              >
                <span class="c-select-value" data-select-value data-placeholder="true">Wybierz</span>
                <span class="c-select-icon"><i class="ph ph-caret-down"></i></span>
              </button>
              <div class="c-select-dropdown" data-select-dropdown aria-hidden="true">
                <div class="c-select-dropdown-list" role="listbox" id="select-disabled-list">
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="0">0</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="1">0, 1</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="2">0, 1, 2</button>
                </div>
              </div>
            </div>
            <span class="c-input-hint">Disabled.</span>
          </div>
          <div class="c-input-field">
            <label class="c-input-label" id="select-error-label">Przedzial</label>
            <div class="c-select" data-select>
              <button
                class="c-select-trigger"
                type="button"
                data-select-trigger
                aria-labelledby="select-error-label"
                aria-controls="select-error-list"
                aria-expanded="false"
                aria-haspopup="listbox"
                aria-invalid="true"
              >
                <span class="c-select-value" data-select-value data-placeholder="true">Wybierz</span>
                <span class="c-select-icon"><i class="ph ph-caret-down"></i></span>
              </button>
              <div class="c-select-dropdown" data-select-dropdown aria-hidden="true">
                <div class="c-select-dropdown-list" role="listbox" id="select-error-list">
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="0">0</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="1">0, 1</button>
                  <button class="c-select-option" type="button" role="option" data-select-option data-value="2">0, 1, 2</button>
                </div>
              </div>
            </div>
            <span class="c-input-hint c-input-hint--error">This is an error message.</span>
          </div>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="input-multiselect" title="Multi select">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='input-stack'>
  <div class='c-input-field'>
    <label class='c-input-label' id='multiselect-demo-label'>Users</label>
    <div class='c-multiselect' data-multiselect>
      <button
        class='c-multiselect-trigger'
        type='button'
        data-multiselect-trigger
        aria-labelledby='multiselect-demo-label'
        aria-controls='multiselect-demo-list'
        aria-expanded='false'
        aria-haspopup='listbox'
      >
        <div class='c-multiselect-content'>
          <div class='c-multiselect-tags' data-multiselect-tags></div>
          <span class='c-multiselect-value' data-multiselect-value data-placeholder='true'>Wybierz</span>
        </div>
        <span class='c-multiselect-icon'><i class='ph ph-caret-down'></i></span>
      </button>
      <div class='c-select-dropdown c-multiselect-dropdown' data-multiselect-dropdown aria-hidden='true'>
        <div class='c-select-dropdown-list c-multiselect-list' data-multiselect-list role='listbox' id='multiselect-demo-list'>
          <button class='c-multiselect-option c-multiselect-option--group' type='button' role='option' aria-selected='true' data-multiselect-option data-value='p-1' data-label='Personal details'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' checked />
            <span class='c-multiselect-option-label'>Personal details</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' aria-selected='true' data-multiselect-option data-value='i-1' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' checked />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' data-multiselect-option data-value='i-2' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' data-multiselect-option data-value='i-3' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' data-multiselect-option data-value='i-4' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' data-multiselect-option data-value='i-5' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
          <button class='c-multiselect-option' type='button' role='option' data-multiselect-option data-value='i-6' data-label='Item'>
            <input type='checkbox' class='c-checkbox c-checkbox-lg' />
            <span class='c-multiselect-option-label'>Item</span>
          </button>
        </div>
      </div>
    </div>
    <span class='c-input-hint'>This is a hint text to help user.</span>
  </div>
</div>`"
      >
        <div class="input-stack">
          <div class="c-input-field">
            <label class="c-input-label" id="multiselect-demo-label">Users</label>
            <div class="c-multiselect" data-multiselect>
              <button
                class="c-multiselect-trigger"
                type="button"
                data-multiselect-trigger
                aria-labelledby="multiselect-demo-label"
                aria-controls="multiselect-demo-list"
                aria-expanded="false"
                aria-haspopup="listbox"
              >
                <div class="c-multiselect-content">
                  <div class="c-multiselect-tags" data-multiselect-tags></div>
                  <span class="c-multiselect-value" data-multiselect-value data-placeholder="true">Wybierz</span>
                </div>
                <span class="c-multiselect-icon"><i class="ph ph-caret-down"></i></span>
              </button>
              <div class="c-select-dropdown c-multiselect-dropdown" data-multiselect-dropdown aria-hidden="true">
                <div class="c-select-dropdown-list c-multiselect-list" data-multiselect-list role="listbox" id="multiselect-demo-list">
                  <button class="c-multiselect-option c-multiselect-option--group" type="button" role="option" aria-selected="true" data-multiselect-option data-value="p-1" data-label="Personal details">
                    <input type="checkbox" class="c-checkbox c-checkbox-lg" checked />
                    <span class="c-multiselect-option-label">Personal details</span>
                  </button>
                  <button class="c-multiselect-option" type="button" role="option" aria-selected="true" data-multiselect-option data-value="i-1" data-label="Item">
                    <input type="checkbox" class="c-checkbox c-checkbox-lg" checked />
                    <span class="c-multiselect-option-label">Item</span>
                  </button>
                  <button class="c-multiselect-option" type="button" role="option" data-multiselect-option data-value="i-2" data-label="Item">
                    <input type="checkbox" class="c-checkbox c-checkbox-lg" />
                    <span class="c-multiselect-option-label">Item</span>
                  </button>
                  <button class="c-multiselect-option" type="button" role="option" data-multiselect-option data-value="i-3" data-label="Item">
                    <input type="checkbox" class="c-checkbox c-checkbox-lg" />
                    <span class="c-multiselect-option-label">Item</span>
                  </button>
                  <button class="c-multiselect-option" type="button" role="option" data-multiselect-option data-value="i-4" data-label="Item">
                    <input type="checkbox" class="c-checkbox c-checkbox-lg" />
                    <span class="c-multiselect-option-label">Item</span>
                  </button>
                  <button class="c-multiselect-option" type="button" role="option" data-multiselect-option data-value="i-5" data-label="Item">
                    <input type="checkbox" class="c-checkbox c-checkbox-lg" />
                    <span class="c-multiselect-option-label">Item</span>
                  </button>
                  <button class="c-multiselect-option" type="button" role="option" data-multiselect-option data-value="i-6" data-label="Item">
                    <input type="checkbox" class="c-checkbox c-checkbox-lg" />
                    <span class="c-multiselect-option-label">Item</span>
                  </button>
                </div>
              </div>
            </div>
            <span class="c-input-hint">This is a hint text to help user.</span>
          </div>
        </div>
      </DocsExample>
    </DocsSubsection>
  </DocsSection>
</template>

<style scoped>
.input-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.input-stack .c-input-field {
  max-width: 400px;
}
</style>
