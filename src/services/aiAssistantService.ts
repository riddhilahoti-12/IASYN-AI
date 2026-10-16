export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  clinicalSourceReference?: string;
}

export const INITIAL_ASSISTANT_MESSAGES: AssistantMessage[] = [
  {
    id: 'msg_welcome',
    sender: 'assistant',
    content: "Hello! I am your IASYN AI Therapy Companion. I can help explain your prescribed exercises, summarize movement cues prescribed by Dr. Marcus Reynolds, or clarify instructions in your current Phase II recovery plan. \n\nPlease note: I do not provide primary medical diagnoses or alter prescribed protocols.",
    timestamp: 'Just now',
    clinicalSourceReference: 'IASYN Clinical Safety Guardrails v1.0 & Prescribed Care Plan'
  }
];

export const aiAssistantService = {
  /**
   * Phase 1 Demonstrative AI Assistant interface with explainable medical citations.
   * Full RAG pipeline with vector search over clinical protocols is scheduled for Phase 2/3.
   */
  async sendMessage(userQuery: string): Promise<AssistantMessage> {
    await new Promise((r) => setTimeout(r, 600));

    const lower = userQuery.toLowerCase();
    let reply = "I understand you're asking about your recovery. Your active protocol focuses on gentle scapular retraction and passive pendulum motion. Always stop if your pain level exceeds 4/10 on the VAS scale.";
    let citation = 'Post-Subacromial Decompression Phase II Protocol (Dr. Marcus Reynolds, MD)';

    if (lower.includes('pain') || lower.includes('hurt')) {
      reply = "If you experience sharp or pinching pain at the front of your shoulder during wand flexion, lower the elevation angle immediately. Mild muscle fatigue in the upper back is normal, but acute joint pain requires stopping the exercise and notifying your care team.";
      citation = 'American Physical Therapy Association (APTA) Rotator Cuff Rehabilitation Guidelines';
    } else if (lower.includes('rep') || lower.includes('frequency') || lower.includes('often')) {
      reply = "Dr. Reynolds has prescribed Scapular Retractions twice daily (morning & evening, 3 sets of 10 with 5-second holds), and Codman Pendulums for 60 seconds each direction daily before your wand sessions.";
      citation = 'Prescribed Therapy Plan (ID: tp_shld_2024_01)';
    } else if (lower.includes('ice') || lower.includes('heat') || lower.includes('sore')) {
      reply = "Following your active therapy session, cold application for 15-20 minutes wrapped in a protective cloth can help reduce post-exercise swelling. Avoid placing ice directly onto bare skin.";
      citation = 'Post-Operative Cryotherapy Standard Protocol';
    }

    return {
      id: `msg_${Date.now()}`,
      sender: 'assistant',
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      clinicalSourceReference: citation
    };
  }
};
