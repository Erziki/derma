"use client"

import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/i18n"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (lang: Language) => void
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages = [
    { code: "fr" as Language, label: "FR" },
    { code: "ar" as Language, label: "AR" },
    { code: "en" as Language, label: "EN" },
  ]

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => onLanguageChange(lang.code)}
          className={currentLanguage === lang.code ? "bg-teal-600 hover:bg-teal-700 text-white" : ""}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  )
}
