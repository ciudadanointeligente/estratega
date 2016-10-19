class Objective < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :project, touch: true
  has_and_belongs_to_many :solutions
  has_and_belongs_to_many :actors
  has_many :outcomes, dependent: :destroy
  has_many :activities, dependent: :destroy
  has_many :asks, dependent: :destroy
  has_one :indicator, dependent: :destroy

  after_commit :flush_cache

  def objective_type_list
    return I18n.t "projects.objective_modal.objective_type_list"
  end

  # def as_ical
  #   cal = Icalendar::Calendar.new
  #   self.activities.each do |a|
  #     if !a.scheduling.blank?
  #       event = Icalendar::Event.new
  #       event.dtstart = a.scheduling
  #       event.summary = a.title
  #       event.description = a.description
  #       cal.add_event(event)
  #     end
  #   end
  #   cal.publish
  #   return cal.to_ical
  # end

  def cache_key
    [super, Apartment::Tenant.current].join("/")
  end

  def cached_asks_count
    Rails.cache.fetch([self, 'asks_count']) { self.asks.size }
  end

  def cached_asks
    Rails.cache.fetch([self, 'asks']) { self.asks.to_a }
  end

  def cached_outcomes_count
    Rails.cache.fetch([self, 'outcomes_count']) { self.outcomes.size }
  end

  def cached_outcomes
    Rails.cache.fetch([self, 'outcomes']) { self.outcomes.to_a }
  end

  def cached_indicator
    Rails.cache.fetch([self, 'indicator']) { self.indicator }
  end

  def cached_activities_count
    Rails.cache.fetch([self, 'activities_count']) { self.activities.size }
  end

  def cached_activities
    Rails.cache.fetch([self, 'activities']) { self.activities.to_a }
  end

  def cached_actors
    Rails.cache.fetch([self, 'actors']) { self.actors.to_a }
  end

  def self.cached_find(id)
    Rails.cache.fetch([name, id, Apartment::Tenant.current]) { find(id) }
  end

  def flush_cache
    Rails.cache.delete([self.class.name, id, Apartment::Tenant.current])
  end

end
