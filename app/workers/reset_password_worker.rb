class ResetPasswordWorker
  include Sidekiq::Worker

  def perform(email, token)
    ResetPasswordMailer.call(email, token).deliver
  end
end
