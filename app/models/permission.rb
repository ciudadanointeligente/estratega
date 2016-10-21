class Permission < ActiveRecord::Base
  belongs_to :project, touch: true
  belongs_to :user, touch: true

  after_commit :flush_cache

  def init
    self.role ||=:owner
  end

  validates_uniqueness_of :user_id, :scope => [:project_id]

  enum role: [:owner, :collaborator, :guest]

  def self.cached_find(project_id, user_id)
    Rails.cache.fetch([name, project_id, user_id, Apartment::Tenant.current]) { Permission.where(project_id: project_id ).where(user_id: user_id).first }
  end

  def flush_cache
    Rails.cache.delete([self.class.name, project.id, user.id, Apartment::Tenant.current])
  end

end
