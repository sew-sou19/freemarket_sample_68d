Recaptcha.configure do |config|
  ENV['RECAPTCHA_SITE_KEY']   = Rails.application.credentials.recaptcha[:public_key]
  ENV['RECAPTCHA_SECRET_KEY'] = Rails.application.credentials.recaptcha[:private_key]
  config.site_key  = Rails.application.credentials.recaptcha[:public_key]
  config.secret_key = Rails.application.credentials.recaptcha[:private_key]
end