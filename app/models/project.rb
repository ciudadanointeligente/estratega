class Project < ActiveRecord::Base
  has_many :resources, dependent: :destroy
  has_many :objectives, dependent: :destroy
  has_one :real_problem, dependent: :destroy
  has_many :users, through: :permissions
  has_many :permissions, dependent: :destroy
  has_many :activities, dependent: :destroy

  validates :title, presence: true
  validate :max_projects_not_reached

  after_commit :flush_cache

  def max_projects_not_reached
    tenant = Apartment::Tenant.current
    if tenant != 'public'
      org = Organization.find_by_subdomain tenant.to_s
      num_projects = Project.all.count
      if num_projects >= Integer(org.max_projects)
        errors[:base] << I18n.t('.max_projects_reached')
      end
    end
  end

  def asks
    @asks = []
    self.cached_objectives.each do |objective|
      objective.cached_asks.each do |ask|
        @asks << ask
      end
    end
    return @asks
  end

  def outcomes
    @outcomes = []
    self.cached_objectives.each do |objective|
      objective.cached_outcomes.each do |outcome|
        @outcomes << outcome
      end
    end
    return @outcomes
  end

  # def activities
  #   @activities = []
  #   self.objectives.each do |objective|
  #     objective.activities.each do |activity|
  #       @activities << activity
  #     end
  #   end
  #   return @activities
  # end

  def as_ical
    cal = Icalendar::Calendar.new
    self.activities.each do |a|
      if !a.start_date.blank?
        event = Icalendar::Event.new
        event.dtstart = a.start_date
        unless a.end_date.blank?
          event.dtend = a.end_date
        end
        event.summary = a.title
        event.description = a.description
        cal.add_event(event)
      end
    end
    cal.publish
    return cal.to_ical
  end

  def cache_key
    [super, Apartment::Tenant.current].join("/")
  end

  def cached_objectives_count
    Rails.cache.fetch([self, 'objectives_count']) { self.objectives.size }
  end

  def cached_objectives
    Rails.cache.fetch([self, 'objectives']) { self.objectives.to_a }
  end

  def cached_prioritized_objectives_count
    Rails.cache.fetch([self, 'prioritized_objectives_count']) { self.objectives.where('prioritized = true').size }
  end

  def cached_prioritized_objectives
    Rails.cache.fetch([self, 'prioritized_objectives']) { self.objectives.where('prioritized = true').to_a }
  end

  def cached_real_problem
    Rails.cache.fetch([self, 'real_problem']) { self.real_problem }
  end

  def cached_resources
    Rails.cache.fetch([self, 'resources']) { self.resources.to_a }
  end

  def cached_activities
    Rails.cache.fetch([self, 'activities']) { self.activities.to_a }
  end

  def cached_users
    Rails.cache.fetch([self, 'users']) { self.users.to_a }
  end

  def cached_permissions
    Rails.cache.fetch([self, 'permissions']) { self.permissions.to_a }
  end

  def self.cached_public_projects
    Rails.cache.fetch(['public_projects', Apartment::Tenant.current]) { Project.where(public: :true).to_a }
  end

  def self.cached_find(id)
    Rails.cache.fetch([name, id, Apartment::Tenant.current]) { find(id) }
  end

  def flush_cache
    Rails.cache.delete([self.class.name, id, Apartment::Tenant.current])
    Rails.cache.delete(['public_projects', Apartment::Tenant.current])
    self.users.map{ |u| u.flush_cache }
  end
  # def cached_asks_count
  #   Rails.cache.fetch([self, 'asks_count']) { self.asks.size }
  # end

end
