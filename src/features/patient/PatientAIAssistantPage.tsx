import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  AlertCircle,
  HelpCircle,
  Bot
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  aiAssistantService, 
  INITIAL_ASSISTANT_MESSAGES, 
  AssistantMessage 
} from '../../services/aiAssistantService';

export const PatientAIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<AssistantMessage[]>(INITIAL_ASSISTANT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "What should I do if I feel pain during the cane flexion exercise?",
    "How often am I prescribed to perform scapular retractions?",
    "Can I apply ice after completing my therapy session?"
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isTyping) return;

    const userMsg: AssistantMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const response = await aiAssistantService.sendMessage(text);
      setMessages((prev) => [...prev, response]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="badge-demo">Explainable Clinical RAG (Demo)</span>
            <Badge variant="clinical">Supervised AI Guidance</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">IASYN AI Therapy Companion</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ask questions about prescribed exercises, posture cues, and clinical precautions.
          </p>
        </div>

        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 max-w-sm">
          <span className="font-semibold text-slate-700">Safety Guardrail: </span>
          Answers are bound strictly to your clinician's active protocol and approved APTA guidelines.
        </div>
      </div>

      {/* Chat Container */}
      <Card variant="default" className="flex flex-col h-[520px] p-0 overflow-hidden">
        
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/80'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Clinical Citation Badge */}
                {msg.clinicalSourceReference && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Source: {msg.clinicalSourceReference}</span>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.sender === 'user' ? 'You' : 'IASYN Assistant'} • {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
              <Bot className="w-4 h-4 text-brand-600 animate-pulse" />
              <span>Synthesizing clinically cited response...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Quick Questions:
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="text-xs bg-white hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 transition-colors truncate max-w-xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your prescribed exercises or recovery instructions..."
            className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-slate-800"
          />
          <Button
            variant="primary"
            size="md"
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            icon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};
