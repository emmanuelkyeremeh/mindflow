// OpenRouter API configuration for Meta Llama
export const openRouterConfig = {
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  baseUrl: 'https://openrouter.ai/api/v1',
  model: 'meta-llama/llama-3.3-8b-instruct:free',
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  siteName: import.meta.env.VITE_SITE_NAME || 'MindFlow'
};

// Function to generate AI-powered node expansions
export async function generateNodeExpansions(nodeLabel, existingNodes = []) {
  if (!openRouterConfig.apiKey) {
    throw new Error('OpenRouter API key is not configured');
  }

  // Create context from existing nodes to avoid repetition
  const context = existingNodes.length > 0 
    ? `Existing nodes in this mind map: ${existingNodes.join(', ')}. `
    : '';

  const prompt = `${context}Given the central concept "${nodeLabel}", suggest 3-5 closely related concepts that would create meaningful connections in a mind map. These should be:
1. Directly related to "${nodeLabel}" (subcategories, components, or aspects)
2. Complementary concepts that enhance understanding
3. Practical applications or examples
4. Related processes or methodologies

Focus on creating logical, meaningful connections. Return only a JSON array of strings, no additional text or explanations.`;

  try {
    const response = await fetch(`${openRouterConfig.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterConfig.apiKey}`,
        'HTTP-Referer': openRouterConfig.siteUrl,
        'X-Title': openRouterConfig.siteName,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: openRouterConfig.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim();
    
    if (!content) {
      throw new Error('No content received from OpenRouter API');
    }

    // Try to parse JSON response
    try {
      const suggestions = JSON.parse(content);
      if (Array.isArray(suggestions)) {
        return suggestions.slice(0, 5); // Limit to 5 suggestions
      }
    } catch (parseError) {
      console.warn('Failed to parse JSON response, extracting suggestions manually');
    }

    // Fallback: extract suggestions from text response
    const suggestions = content
      .replace(/```json|```/g, '') // Remove code blocks
      .split(/[,\n-]/)
      .map(s => s.trim().replace(/^["\[]|["\]]$/g, '')) // Remove quotes and brackets
      .filter(s => s.length > 0 && s !== '[' && s !== ']' && !s.match(/^\d+\./)) // Remove numbered lists
      .slice(0, 5);

    return suggestions.length > 0 ? suggestions : [
      `${nodeLabel} - Related Concept 1`,
      `${nodeLabel} - Related Concept 2`,
      `${nodeLabel} - Related Concept 3`
    ];

  } catch (error) {
    console.error('Error generating node expansions:', error);
    
    // Return fallback suggestions
    return [
      `${nodeLabel} - Related Concept 1`,
      `${nodeLabel} - Related Concept 2`,
      `${nodeLabel} - Related Concept 3`
    ];
  }
}
