<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">Viki-Store</h1>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="logout"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span class="text-white text-sm font-medium">P</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Productos</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.totalProducts }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span class="text-white text-sm font-medium">S</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Stock Total</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.totalStock }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span class="text-white text-sm font-medium">L</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Stock Bajo</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.lowStock }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <span class="text-white text-sm font-medium">M</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Movimientos Hoy</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.todayMovements }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Alertas de Stock Bajo</h3>
            <div v-if="lowStockProducts.length === 0" class="text-gray-500">
              No hay productos con stock bajo
            </div>
            <ul v-else class="divide-y divide-gray-200">
              <li v-for="product in lowStockProducts" :key="product.id" class="py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span class="text-yellow-600 text-sm font-medium">!</span>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ product.name }}</p>
                    <p class="text-sm text-gray-500">SKU: {{ product.sku }} | Stock: {{ product.stock }} / {{ product.minStock }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const stats = ref({
  totalProducts: 0,
  totalStock: 0,
  lowStock: 0,
  todayMovements: 0
})

const lowStockProducts = ref([])

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const loadDashboard = async () => {
  try {
    const [productsRes, movementsRes] = await Promise.all([
      axios.get('/api/products'),
      axios.get('/api/movements')
    ])

    const products = productsRes.data
    const movements = movementsRes.data

    stats.value.totalProducts = products.length
    stats.value.totalStock = products.reduce((sum: number, p: any) => sum + p.stock, 0)
    stats.value.lowStock = products.filter((p: any) => p.stock <= p.minStock).length

    const today = new Date().toDateString()
    stats.value.todayMovements = movements.filter((m: any) =>
      new Date(m.createdAt).toDateString() === today
    ).length

    lowStockProducts.value = products.filter((p: any) => p.stock <= p.minStock)
  } catch (error) {
    console.error('Error loading dashboard:', error)
  }
}

onMounted(() => {
  loadDashboard()
})
</script>