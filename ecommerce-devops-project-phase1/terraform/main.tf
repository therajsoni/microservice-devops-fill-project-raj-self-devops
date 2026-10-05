terraform {
  required_version = ">= 1.6.0"

  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

resource "local_file" "project_info" {
  filename = "${path.module}/generated/project-info.txt"
  content  = "Local Terraform environment for the DevOps e-commerce project."
}

output "project_info_file" {
  value = local_file.project_info.filename
}
