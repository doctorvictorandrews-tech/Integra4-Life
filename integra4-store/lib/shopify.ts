// lib/shopify.ts
// ARQUIVO COMPLETO E ATUALIZADO

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function ShopifyData(query: string) {
  const URL = `https://${domain}/api/2024-01/graphql.json`;
  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => response.json());
    return data;
  } catch (error) {
    throw new Error("Erro na conexão Shopify");
  }
}

export async function getProducts() {
  const query = `
  {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          tags
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 1) {
            edges { node { url altText } }
          }
        }
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  return response.data?.products?.edges ? response.data.products.edges.map((e: any) => e.node) : [];
}

export async function getProduct(handle: string) {
  const query = `
  {
    product(handle: "${handle}") {
      id
      title
      handle
      description
      descriptionHtml
      tags
      priceRange {
        minVariantPrice { amount currencyCode }
      }
      variants(first: 1) {
        edges { node { id } }
      }
      images(first: 5) {
        edges { node { url altText } }
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  return response.data?.product;
}

export async function createCheckoutMutation(variantId: string, quantity: number) {
  const query = `
    mutation {
      cartCreate(input: { lines: [{ quantity: ${quantity}, merchandiseId: "${variantId}" }] }) {
        cart { checkoutUrl }
      }
    }
  `;
  const response = await ShopifyData(query);
  return response.data?.cartCreate?.cart?.checkoutUrl;
}

// ============================================
// NOVA FUNÇÃO: Detectar dimensão do produto
// ============================================
export function getDimensionColor(tags: string[]) {
  const dimensionMap = {
    'fisica': { 
      color: '#4CAF50', 
      name: 'Física', 
      icon: '💪',
      gradient: 'from-green-400 to-green-600'
    },
    'mental': { 
      color: '#2196F3', 
      name: 'Mental', 
      icon: '🧠',
      gradient: 'from-blue-400 to-blue-600'
    },
    'emocional': { 
      color: '#E91E63', 
      name: 'Emocional', 
      icon: '❤️',
      gradient: 'from-pink-400 to-pink-600'
    },
    'energetica': { 
      color: '#9C27B0', 
      name: 'Energética', 
      icon: '✨',
      gradient: 'from-purple-400 to-purple-600'
    }
  };

  // Procurar tag de dimensão no produto
  const dimensionTag = tags.find(tag => {
    const lowerTag = tag.toLowerCase();
    return lowerTag.includes('fisica') ||
           lowerTag.includes('mental') ||
           lowerTag.includes('emocional') ||
           lowerTag.includes('energetica');
  });

  if (dimensionTag) {
    const lowerTag = dimensionTag.toLowerCase();
    
    if (lowerTag.includes('fisica')) return dimensionMap.fisica;
    if (lowerTag.includes('mental')) return dimensionMap.mental;
    if (lowerTag.includes('emocional')) return dimensionMap.emocional;
    if (lowerTag.includes('energetica')) return dimensionMap.energetica;
  }

  // Default: Energética
  return dimensionMap.energetica;
}