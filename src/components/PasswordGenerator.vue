<template>
  <div class="container">
    <form @submit.prevent="generatePassword" class="password-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="formData.username"
          type="text"
          required
          class="input"
        />
      </div>

      <div class="form-group">
        <label for="service">Service</label>
        <input
          id="service"
          v-model="formData.service"
          type="text"
          required
          class="input"
        />
      </div>

      <div class="form-group">
        <label for="masterPassword">Master Password</label>
        <input
          id="masterPassword"
          v-model="formData.masterPassword"
          type="password"
          required
          class="input"
        />
      </div>

      <div class="form-group">
        <label for="algorithm">Hash Algorithm</label>
        <select
          id="algorithm"
          v-model="formData.algorithm"
          class="select"
        >
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </div>

      <button type="submit" class="button">Generate Password</button>

      <div v-if="generatedPassword" class="result-group">
        <div class="password-field">
          <input
            :type="showPassword ? 'text' : 'password'"
            :value="generatedPassword"
            readonly
            class="input password-input"
          />
          <button
            type="button"
            @click="togglePassword"
            class="copy-button"
          >
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
          <button
            type="button"
            @click="copyToClipboard"
            class="copy-button"
          >
            Copy
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PasswordGenerator',
  setup() {
    const formData = ref({
      username: '',
      service: '',
      masterPassword: '',
      algorithm: 'SHA-256'
    })

    const generatedPassword = ref('')

    const showPassword = ref(false)

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const generatePassword = async () => {
      const combinedString =`${formData.value.username}:${formData.value.service}:${formData.value.masterPassword}`;
      
      // Encode combinedString to a Uint8Array
      const encoder = new TextEncoder();
      const data = encoder.encode(combinedString);
      
      // Hash the combined data
      const hashBuffer = await crypto.subtle.digest(formData.value.algorithm, data);
      
      // Convert hash to hex
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Convert to base64 format for password
      const base64String = btoa(hashHex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join(''));
      const transformedPassword = base64String.replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');

      generatedPassword.value = transformedPassword
    }

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(generatedPassword.value)
        alert('Password copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy password:', err)
      }
    }

    return {
      formData,
      generatedPassword,
      generatePassword,
      copyToClipboard,
      showPassword,
      togglePassword
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input, .select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.button {
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.button:hover {
  background-color: #4338ca;
}

.result-group {
  margin-top: 1rem;
}

.password-field {
  display: flex;
  gap: 0.5rem;
}

.copy-button {
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.copy-button:hover {
  background-color: #059669;
}

.password-input {
  flex: 1;
}
</style> 