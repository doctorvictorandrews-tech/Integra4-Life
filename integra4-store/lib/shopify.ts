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
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });
    return data;
  } catch (error) {
    throw new Error("Erro ao conectar na Shopify");
  }
}

// 1. Busca vitrine
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
          availableForSale
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
  `;

  const response = await ShopifyData(query);
  const allProducts = response.data?.products?.edges
    ? response.data.products.edges.map((edge: any) => edge.node)
    : [];

  return allProducts;
}

// 2. Busca produto único (ATUALIZADO COM VARIANTS)
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
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
  `;

  const response = await ShopifyData(query);
  return response.data.product;
}

// 3. Função auxiliar para o checkout (será usada pela Server Action)
export async function createCheckoutMutation(variantId: string, quantity: number) {
  const query = `
    mutation {
      cartCreate(input: { lines: [{ quantity: ${quantity}, merchandiseId: "${variantId}" }] }) {
        cart {
          checkoutUrl
        }
      }
    }
  `;
  const response = await ShopifyData(query);
  return response.data.cartCreate.cart.checkoutUrl;
}