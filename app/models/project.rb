class Project < ActiveRecord::Base
  has_many :resources, dependent: :destroy
  has_many :objectives, dependent: :destroy
  has_one :real_problem, dependent: :destroy
  has_many :users, through: :permissions
  has_many :permissions, dependent: :destroy
  has_many :activities, dependent: :destroy

  validates :title, presence: true
  validate :max_projects_not_reached
  
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
    self.objectives.each do |objective|
      objective.asks.each do |ask|
        @asks << ask
      end
    end
    return @asks    
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
  
end
