package utils

import (
	"strings"
)

func GetTranslatedList(pCtx interface{ T(string) string }, key string, separator string) []string {
	rawString := pCtx.T(key)

	if rawString == "" {
		return []string{}
	}

	items := strings.Split(rawString, separator)

	var cleanedItems []string
	for _, item := range items {
		trimmedItem := strings.TrimSpace(item)
		if trimmedItem != "" { // Nur nicht-leere Einträge hinzufügen
			cleanedItems = append(cleanedItems, trimmedItem)
		}
	}

	return cleanedItems
}
