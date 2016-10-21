class Outcome < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :objective, touch: true
  #has_and_belongs_to_many :activities
  has_one :indicator, dependent: :destroy
  has_many :asks, dependent: :destroy

  def type_list
    return I18n.t "objectives.stage4.interim_outcome_type_list"
  end

  def cache_key
    [super, Apartment::Tenant.current].join("/")
  end

  def cached_asks_count
    Rails.cache.fetch([self, 'asks_count']) { self.asks.size }
  end

  def cached_asks
    Rails.cache.fetch([self, 'asks']) { self.asks.to_a }
  end

  def cached_indicator
    Rails.cache.fetch([self, 'indicator']) { self.indicator }
  end

end
