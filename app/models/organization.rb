class Organization < ActiveRecord::Base
  validates :email, uniqueness: true
  # validates_format_of :email,:with => Devise::email_regexp
  validates :subdomain, presence: true
  validates :subdomain, uniqueness: true
  validates :subdomain, length: { minimum: 3 }

  has_attached_file :logo, styles: { medium: "200x100>", thumb: "100x50>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :logo, content_type: /\Aimage\/.*\Z/

    after_create :create_tenant
    after_destroy :drop_tenant

  private

    def create_tenant
      Apartment::Tenant.create(subdomain)
      create_local_admin
      create_full_admin
    end

    def create_local_admin
      Apartment::Tenant.switch!(subdomain)
      generated_password = Devise.friendly_token.first(8)
      new_user = User.create(email: email, password: generated_password)
      raw_token, hashed_token = Devise.token_generator.generate(User, :reset_password_token)
      new_user.reset_password_token = hashed_token
      new_user.reset_password_sent_at = Time.now.utc
      new_user.role = 1
      new_user.save
      Apartment::Tenant.switch!
    end

    def create_full_admin
      Apartment::Tenant.switch!(subdomain)
      generated_password = Devise.friendly_token.first(8)
      new_user = User.create(email: ENV['ADMIN_MAIL'], password: generated_password)
      raw_token, hashed_token = Devise.token_generator.generate(User, :reset_password_token)
      new_user.reset_password_token = hashed_token
      new_user.reset_password_sent_at = Time.now.utc
      new_user.role = 2
      new_user.save
      Apartment::Tenant.switch!
    end

    def drop_tenant
      Apartment::Tenant.drop(subdomain)
    end
end
