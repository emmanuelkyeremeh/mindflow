// OpenRouter API configuration for DeepSeek
export const openRouterConfig = {
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  baseUrl: 'https://openrouter.ai/api/v1',
  model: 'deepseek/deepseek-chat-v3.1:free',
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

  const prompt = `${context}Given the node "${nodeLabel}", suggest 3-5 related concepts or ideas that would make good child nodes in a mind map. Focus on concepts that are directly related, complementary, or that would help expand understanding of "${nodeLabel}". Return only a JSON array of strings, no additional text.`;

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
      .split(/[,\n-]/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && s !== '[' && s !== ']')
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
