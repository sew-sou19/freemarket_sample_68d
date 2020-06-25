Recaptcha.configure do |config|
  config.site_key  = Rails.application.credentials.recaptcha[:public_key]
  config.secret_key = Rails.application.credentials.recaptcha[:private_key]
  config.site_key = Rails.application.credentials.recaptcha [:payjp_private_key]
  config.secret_key = Rails.application.credentials.recaptcha [:payjp_key]
end