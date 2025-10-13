# MARK: Solution

variable "project_name" {
  description = "The name of the project."
  type        = string
  default     = "VictorFrye.COM"
}

variable "application_name" {
  description = "The name of the application."
  type        = string
  default     = "dotcom"
}

variable "rg_name" {
  description = "The name of the resource group."
  type        = string
  default     = "rg-dotcom"
}

variable "owner_name" {
  description = "The name of the owner."
  type        = string
  default     = "victorfrye"
}

# MARK: Azure Static Web App

variable "swa_sku" {
  description = "The SKU for the Static Web App."
  type        = string
  default     = "Free"
}

# MARK: Azure DNS

variable "domain_name" {
  description = "The domain name for the DNS zone."
  type        = string
  default     = "victorfrye.com"
}

variable "bing_validation_token" {
  description = "The Bing validation token."
  type        = string
  default     = "11c96e44392f490ee66a7bca4621f35f"
}

variable "entra_validation_token" {
  description = "The Entra ID validation token."
  type        = string
  default     = "MS=ms98140114"
}

variable "google_validation_token" {
  description = "The Google validation token."
  type        = string
  default     = "google-site-verification=GszGq7kP4hWb1k8UXPzSZO_nvRMqzrY9W6cmAxEJ7h4"
}

variable "bluesky_validation_token" {
  description = "The Bluesky validation token."
  type        = string
  default     = "did=did:plc:nfa5vksskl6vjbw57a2irgob"
}
