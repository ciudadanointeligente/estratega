class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :sandboxes
  has_many :projects, through: :permissions
  has_many :permissions, dependent: :destroy

  def cache_key
    [super, Apartment::Tenant.current].join("/")
  end

  def cached_projects
    Rails.cache.fetch([self, 'projects']) { self.projects.to_a }
  end

  def flush_cache
    Rails.cache.delete([self, 'projects'])
  end
end
